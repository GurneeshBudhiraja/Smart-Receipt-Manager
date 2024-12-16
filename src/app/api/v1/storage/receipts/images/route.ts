import { createSessionClient } from "@/lib/appwrite/appwrite";
import { getDoc } from "@/lib/appwrite/document";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await createSessionClient()
    if (!session) {
      return NextResponse.json({
        message: "User not logged in",
        success: false
      }, { status: 401 })
    }
    const { account, db, } = session;
    const { $id } = await account.get()
    const getDocResponse = await getDoc(db, $id, process.env.NEXT_APPWRITE_IMAGE_COLLECTION_ID)
    if (getDocResponse === null) {
      return NextResponse.json({
        message: "No images found",
        success: false,
        data: []
      }, { status: 404 })
    }
    const { image_ids }: { image_ids: Array<string> } = getDocResponse;

    const data: { category: string, image: string }[] = [];
    image_ids.forEach((image_id) => {
      data.push({
        category: image_id.split("_")[0],
        image: image_id.split("_")[1]
      })
    })
    return NextResponse.json({
      message: "get-images fetch successful",
      success: true,
      data
    }, { status: 200 })
  } catch (error) {
    console.log("error in receipts/get-images route", error)
    return NextResponse.json({
      message: "Something went wrong",
      success: false
    }, { status: 500 })
  }
}