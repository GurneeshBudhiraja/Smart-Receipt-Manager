import { createSessionClient } from "@/lib/appwrite/appwrite";
import { getDoc } from "@/lib/appwrite/document";
import { NextRequest, NextResponse, } from "next/server";



export async function GET(request: NextRequest) {
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
    console.log(getDocResponse)
    if (getDocResponse === null) {
      return NextResponse.json({
        message: "No images found",
        success: false,
        data: []
      }, { status: 404 })
    }
    const { image_ids }: { image_ids: Array<string> } = getDocResponse;

    return NextResponse.json({
      message: "get-images fetch successful",
      success: true,
      image_ids,
    }, { status: 200 })
  } catch (error) {
    console.log("error in receipts/get-images route", error)
    return NextResponse.json({
      message: "Something went wrong",
      success: false
    }, { status: 500 })
  }
}