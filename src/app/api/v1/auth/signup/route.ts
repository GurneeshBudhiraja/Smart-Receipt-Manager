import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/appwrite/appwrite"
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
  try {
    const formDataResp = await request.formData();
    const { email, password, confirmPassword } = Object.fromEntries(formDataResp) as {
      email: string;
      password: string;
      confirmPassword: string;
    };
    if (!email?.trim() || !password?.trim() || !confirmPassword?.trim() || (password !== confirmPassword)) {
      return NextResponse.json({
        message: "Invalid/missing form data",
        success: false,
      }, { status: 400 });
    }
    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password,);
    return NextResponse.json({
      message: "Account created successfully",
      success: true,
    }, { status: 201 });

  } catch (error) {
    console.log("Error in signup route", error);
    if (error instanceof Error) {
      if (error.message.startsWith("A user with the same id, email, or phone already exists in this project.")) {
        return NextResponse.json({
          message: "A user with the same id, email, or phone already exists",
          success: false,
        }, { status: 400 });
      }
      return NextResponse.json({
        message: error.message,
        success: false,
      }, { status: 500 })
    }
  }
}