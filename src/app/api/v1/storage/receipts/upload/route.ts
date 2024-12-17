import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utils/uploadImage";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/appwrite";
import { createDoc, getDoc, updateDoc } from "@/lib/appwrite/document";
import { getImageSummary } from "@/lib/gemini/imageSummary";
import { toBase64 } from "@/utils/base64convert";
export async function POST(request: NextRequest) {
  const sessionClient = await createSessionClient();
  let uploadedImageResponse;
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

    const data = (await request.formData());
    const imagePath = data.get('image') as File;
    const category = data.get('category');
    const sideNotes = data.get('sidenotes');

    if (!imagePath || !category || !sideNotes) {
      return NextResponse.json({
        message: "Please provide all the required data",
        success: false
      }, { status: 400 })
    }
    console.log(imagePath)
    return NextResponse.json({
      message: "Data has been saved successfully",
      success: true,
    }, { status: 200 })
    // TODO: change this later on 
    const response = await getImageSummary("");

    console.log(response);
    return NextResponse.json({
      message: "Data has been saved successfully",
      success: true,
    }, { status: 200 });

    const { account, storage, db } = sessionClient;

    // TODO: remove this functionality from here and instead upload the image directly from the frontend to handle big image files
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
            "image_ids": [`${category}_${uploadedImageId}`],
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

    const { storage } = sessionClient;
    if (uploadedImageResponse) {

      const { $id: uploadedImageId } = uploadedImageResponse;
      await storage.deleteFile(
        process.env.NEXT_APPWRITE_BUCKET_ID,
        uploadedImageId,
      )
      console.log("IMAGE DELETED FROM STORAGE");
    }
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