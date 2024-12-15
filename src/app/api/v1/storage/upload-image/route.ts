import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utils/uploadImage";
import { cookies } from "next/headers";
import { ID, Permission, Query, Role } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite/appwrite";
import { getDoc } from "@/lib/appwrite/document";
export async function POST(request: NextRequest) {
  try {
    // TODO: destructure the form from here and pass it to the uploadImage function
    const sessionClient = await createSessionClient();
    const adminClient = await createAdminClient();

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

    const imagePath = data.get('image');
    const category = data.get('category');
    const sideNotes = data.get('sidenotes');
    const receiptText = data.get("receipttext");

    const { account, storage, db: clientSessionDB } = sessionClient;
    const { db: adminDb } = adminClient


    // TODO: uncomment this
    const uploadedImageResponse = await uploadImage(storage, imagePath);
    if (!uploadedImageResponse) {
      return NextResponse.json({
        message: "Error uploading image",
        success: false
      }, { status: 500 })
    }

    const { $id: uploadedImageId } = uploadedImageResponse;

    // using userId as the documentId in the db
    const { $id: documentId } = await account.get()

    const getDocResponse = await getDoc(clientSessionDB, documentId)
    // if the document does not exist
    if (getDocResponse === null) {
      console.log("creating a new document");
      await clientSessionDB.createDocument(
        process.env.NEXT_APPWRITE_DB_ID,
        process.env.NEXT_APPWRITE_IMAGE_COLLECTION_ID,
        documentId,
        {
          "image_ids": [`${category}_${uploadedImageId}`],
        }
      )

    } else {
      // if the doc exists, update the existing document
      const { image_ids } = getDocResponse
      console.log("image_ids:", image_ids);
      await clientSessionDB.updateDocument(
        process.env.NEXT_APPWRITE_DB_ID,
        process.env.NEXT_APPWRITE_IMAGE_COLLECTION_ID,
        documentId,
        {
          "image_ids": [`${category}_${uploadedImageId}`, ...image_ids,]
        }
      )
    }

    await clientSessionDB.createDocument(
      process.env.NEXT_APPWRITE_DB_ID,
      process.env.NEXT_APPWRITE_NOTES_COLLECTION_ID,
      uploadedImageId,
      {
        category,
        sidenotes: sideNotes,
      }
    )

    return NextResponse.json({
      message: "Data has been saved successfully",
      success: true,
    }, { status: 200 })

  } catch (error) {
    console.error(error);
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