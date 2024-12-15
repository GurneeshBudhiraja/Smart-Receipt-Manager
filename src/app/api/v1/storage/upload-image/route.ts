import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/utils/uploadImage";
import { cookies } from "next/headers";
import { ID, Permission, Query, Role } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/server/appwrite";
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
    const { account, storage, db: sessionDB } = sessionClient;
    const { db: adminDB } = adminClient
    const data = (await request.formData());

    const imagePath = data.get('image');

    // TODO: uncomment this
    // const uploadedImageResponse = await uploadImage(storage, imagePath);
    // if (!uploadedImageResponse) {
    //   return NextResponse.json({
    //     message: "Error uploading image",
    //     success: false
    //   }, { status: 500 })
    // }
    // const { $id: uploadedImageId } = uploadedImageResponse;

    const { $id: userId } = await account.get()
    //TODO: Implement this As soon as the user creates a new document is added to the collection named in image_id
    // TODO: move this to the libs folder perform the operation there
    // PSUEDO CODE: 1. If there is no existing document
    //  then create a new document which contains array of image ids
    // else: 
    //  update the document there using the adminSession
    const imageIdDocument = await adminDB.getDocument(
      process.env.NEXT_APPWRITE_DB_ID,
      process.env.NEXT_APPWRITE_IMAGE_COLLECTION_ID,
      userId
    )
    console.log(imageIdDocument); 
    return NextResponse.json({
      message: "Image uploaded successfully",
      success: true,
      data: "imageUploadResponse"
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