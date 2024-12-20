import { getImageSummary } from "@/lib/gemini/imageSummary";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formFields = await request.formData();
    const image = formFields.get('image') as string;
    const mimeType = formFields.get("mimeType") as string;
    const geminiImageSummary = await getImageSummary(image, mimeType,) as string

    return NextResponse.json({
      success: true,
      message: "Form data received successfully",
      data: JSON.parse(geminiImageSummary)
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in getting the image description from Gemini:", error.message);
      return NextResponse.json({
        success: false,
        message: "Error in getting the image description from Gemini",
      })
    }
  }
}