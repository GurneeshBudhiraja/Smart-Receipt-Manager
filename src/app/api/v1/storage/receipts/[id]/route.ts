import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { createSessionClient } from "@/lib/appwrite/appwrite"
import { getDoc } from "@/lib/appwrite/document"

export async function GET() {
  try {
    const headerList = await headers()
    const id = headerList.get("x-path") // Gets the url id from the URI
    if (!id) {
      return NextResponse.json({
        message: "No receipt data found",
        success: false,
      }, { status: 404 })
    }
    const session = await createSessionClient()
    // checks if the user is logged in
    if (!session) {
      return NextResponse.json({
        message: "User not logged in",
        success: false
      }, { status: 401 })
    }

    const { db } = await createSessionClient()
    const getDocResponse = await getDoc(db, id, process.env.NEXT_APPWRITE_NOTES_COLLECTION_ID)

    // No document found
    if (getDocResponse === null) {
      return NextResponse.json({
        message: "No receipt data found",
        success: false,
        data: []
      }, { status: 404 })
    }

    return NextResponse.json({
      message: "Receipt data found",
      success: true,
      data: getDocResponse
    }, { status: 200 }
    )
  } catch (error) {
    console.error("Error in receipts/:id route", error)
    return NextResponse.json({
      message: "Failed to fetch receipt data",
      success: false,
    }, { status: 500, })
  }
}