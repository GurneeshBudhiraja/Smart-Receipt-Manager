import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { insertVector } from "@/lib/pinecone/pinecone"
export async function POST(request: NextRequest) {
  try {
    const { userId, chatInput } = await request.json();
    
    const data = await insertVector(userId, {
      id: "1",
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      metadata: {
        name: "test1",
        description: "test1"
      }
    })
    return NextResponse.json({ message: "Hello from the chat route", success: true, data }, { status: 200 });
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return NextResponse.json({ error: "Error in chat route", message: error.message, success: false }, { status: 500 });
    }
  }

}