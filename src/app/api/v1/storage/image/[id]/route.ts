import { createSessionClient } from "@/lib/appwrite/appwrite";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await createSessionClient()
    if (session === null) {
      return NextResponse.json({
        message: "Access denied",
        success: false
      }, { status: 401 })
    }
    const { storage } = session;
    // Extracts the imageId from the url
    const headersList = await headers();
    const pathName = headersList.get("x-pathname");
    const imageId = pathName?.split("/").filter(Boolean).pop();

    // Gets the mimetype of the image
    const { mimeType } = await storage.getFile(process.env.NEXT_APPWRITE_BUCKET_ID, imageId)

    const fileResponse = await storage.getFileView(process.env.NEXT_APPWRITE_BUCKET_ID, imageId)

    const url = Buffer.from(fileResponse).toString("base64")

    return NextResponse.json({
      success: true,
      message: "Image fetched successfully",
      contentType: mimeType,
      data: url,
      imageId,
    }, { status: 200, })
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in /storage/image/[id] route", error.message);
    }
    return NextResponse.json({
      success: false,
      message: "Error in fetching image from storage",
    }, { status: 500 })
  }
}