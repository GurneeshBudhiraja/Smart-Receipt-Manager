import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utils/uploadImage";
import { createSessionClient } from "@/lib/appwrite/appwrite";
import { createDoc, getDoc, updateDoc } from "@/lib/appwrite/document";
import { createEmbedding } from "@/lib/gemini/embeddings";
import { deleteVector, insertVector } from "@/lib/pinecone/pinecone";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
  const sessionClient = await createSessionClient();
  let uploadedImageResponse;
  const vectorDbDocId = ID.unique();
  try {
    // Checks if the user is logged in
    if (!sessionClient) {
      return NextResponse.json(
        {
          error: 'Not authorized',
          success: false
        },
        {
          status: 401
        }
      )
    }
    const { account, storage, db } = sessionClient;
    const { $id: userId } = await account.get();

    const data = (await request.formData());
    const imagePath = data.get('image') as File;
    const category = data.get('category') as string;
    const sideNotes = data.get('sidenotes');
    const amount = data.get('amount');
    const receiptText = data.get('receipttext') as string;
    const date = data.get('date');


    if (!imagePath || !category || !receiptText) {
      return NextResponse.json({
        message: "Please provide all the required data",
        success: false
      }, { status: 400 })
    }

    // Generates vector representation of the receit text
    const receiptTextVector = await createEmbedding(receiptText)
    console.log(receiptTextVector)
    if (receiptTextVector === null || receiptTextVector.length === 0) {
      console.error("Error in creating embedding")
      return NextResponse.json({
        message: "Something went wrong. Please try again",
        success: false
      }, { status: 500 })
    }
    const vectorDBInsertResponse = await insertVector(vectorDbDocId, userId, receiptTextVector, {
      receiptText: `${receiptText} I have some sidenotes to add ${sideNotes} Tag/category of the receipt/ purchase is ${category}. The date of the purchase is ${date}`,
    },)
    console.log(vectorDBInsertResponse)
    if (!vectorDBInsertResponse.success) {
      return NextResponse.json({
        success: false,
        message: "Error inserting vector into vector store"
      }, { status: 500 })
    }


    uploadedImageResponse = await uploadImage(storage, imagePath);

    // if the image is not uploaded
    if (!uploadedImageResponse) {
      return NextResponse.json({
        message: "Error uploading image",
        success: false
      }, { status: 500 })
    }

    const { $id: uploadedImageId } = uploadedImageResponse;
    console.log("image id:", uploadedImageId);

    // using userId as the documentId in the db
    const { $id: documentId } = await account.get()
    console.log(documentId);

    const getDocResponse = await getDoc(db, documentId, process.env.NEXT_APPWRITE_IMAGE_COLLECTION_ID,)

    // if the document does not exist
    if (getDocResponse === null) {
      console.log("creating a new document");
      const createDocResp =
        await createDoc(
          db, storage, documentId, uploadedImageId, process.env.NEXT_APPWRITE_IMAGE_COLLECTION_ID,
          {
            "image_ids": [`${uploadedImageId}`],
          }
        )
      // not able to create a doc
      if (createDocResp === null) {
        return NextResponse.json(
          {
            message: "Error creating document",
            success: false
          }, { status: 500 }
        )
      }
      console.log(createDocResp)
    } else {
      // updates the existing document
      const { image_ids } = getDocResponse;
      console.log("image_ids:", image_ids);
      const updatedDocResp = await updateDoc(db, storage, category, uploadedImageId, image_ids, documentId)
      // not able to update the doc
      if (updatedDocResp === null) {
        return NextResponse.json(
          {
            message: "Error updating document",
            success: false
          }, { status: 500 }
        )
      }
    }

    // Document for storing the form data
    const createDocResp = await
      createDoc(
        db, storage, uploadedImageId, uploadedImageId, process.env.NEXT_APPWRITE_NOTES_COLLECTION_ID,
        {
          category,
          sidenotes: sideNotes,
          amount,
          date: new Date().toISOString().split("T")[0]
        }
      )
    if (createDocResp === null) {
      return NextResponse.json(
        {
          message: "Error creating document",
          success: false
        }, { status: 500 }
      )
    }

    return NextResponse.json({
      message: "Data has been saved successfully",
      success: true,
    }, { status: 200 })

  } catch (error) {
    console.error(error);
    console.log("DELETING IMAGES");
    const { account, storage } = sessionClient!;
    if (uploadedImageResponse) {
      const { $id: uploadedImageId } = uploadedImageResponse;
      await storage.deleteFile(
        process.env.NEXT_APPWRITE_BUCKET_ID,
        uploadedImageId,
      )
      console.log("IMAGE DELETED FROM STORAGE");
    }
    const { $id: userId } = await account.get()

    console.log("Deleting vector from vector db")
    await deleteVector(userId, vectorDbDocId)
    console.log("vector deleted successfully")
    return NextResponse.json(
      {
        message: "Error uploading image",
        success: false
      },
      {
        status: 500
      }
    )
  }
}