import { createSessionClient } from "@/lib/appwrite/appwrite";
import { createEmbedding } from "@/lib/gemini/embeddings";
import { generateResponse } from "@/lib/gemini/geminiResponse";
import { queryVectors } from "@/lib/pinecone/pinecone";
import { PineconeQueryResponse } from "@/types/pinecone.types";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await createSessionClient()
    if (session === null) {
      return NextResponse.json({
        message: "Unauthorized request",
        success: false
      }, { status: 401 })
    }
    const { account } = session;
    const { $id: userId } = await account.get()

    const formFields = await request.formData()
    const userQuestion = formFields.get("userquestion") as string;
    const userHistoryString = formFields.get("userhistory") as string;

    if (!userQuestion?.trim()) {
      return NextResponse.json({
        message: "Missing data has been provided",
        success: false,
      }, { status: 400 })
    }

    let userHistory = []
    if (userHistoryString.trim()) {
      userHistory = JSON.parse(userHistoryString);
    }
    const userQuestionEmbedding = await createEmbedding(userQuestion) as number[];
    const { matches } = await queryVectors(userId, userQuestionEmbedding) as PineconeQueryResponse;


    // Checks for the empty object
    if (!Object.keys(matches).length) {
      const geminiResponse = await generateResponse(userQuestion, userHistory, []) as string
      return NextResponse.json({
        message: JSON.parse(geminiResponse),
        success: true,
      }, { status: 200 })
    }
    const vectorStoreData = matches.map(match => match.metadata.receiptText)
    const geminiResponseJSON = await generateResponse(userQuestion, userHistory, vectorStoreData)

    const geminiResponse = JSON.parse(geminiResponseJSON)
    console.log(geminiResponse)
    return NextResponse.json({
      message: geminiResponse,
      success: true,
    }, { status: 200 })

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in asking AI", error.message)
    }
    return NextResponse.json({
      success: false,
      message: "Error in asking AI",
    }, { status: 500 })
  }
}