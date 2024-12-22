import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";


// @ts-ignore
export async function uploadImage(storage, imagePath: File) {
  try {
    const id = ID.unique()
    const uploadedImageResponse = await storage.createFile(
      process.env.NEXT_APPWRITE_BUCKET_ID,
      id,
      InputFile.fromBuffer(imagePath, id),
    )
    return uploadedImageResponse;

  } catch {
    return null
  }
}