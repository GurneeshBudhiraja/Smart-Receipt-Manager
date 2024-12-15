import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/appwrite/appwrite";
export async function GET() {
  try {

    const account = await createSessionClient();

    if (!account) {
      return NextResponse.json({
        message: "Account not found",
        success: false
      }, { status: 404 });
    }
    const { account: clientAccount } = account;

    // gets the current user
    const user = await clientAccount.get();

    return NextResponse.json({
      message: "User found",
      success: true,
      data: user
    }, { status: 200 })

  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: "Error in current-user route", message: error.message }, { status: 500 });
    }
  }
}