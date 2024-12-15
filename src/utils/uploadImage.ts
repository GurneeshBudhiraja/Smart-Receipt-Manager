import { createSessionClient } from "@/lib/appwrite/appwrite"
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

// TODO: fix the types later on
export async function uploadImage(storage, imagePath) {
  try {
    const id = ID.unique()
    const uploadedImageResponse = await storage.createFile(
      process.env.NEXT_APPWRITE_BUCKET_ID,
      id,
      InputFile.fromBuffer(imagePath, id),
    )
    return uploadedImageResponse;

  } catch (error) {
    console.error(error);
    console.error('Error uploading image');
    return null
  }
}