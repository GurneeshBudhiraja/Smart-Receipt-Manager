import { createAdminClient } from "@/lib/appwrite/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formDataResp = await request.formData();
    const { email, password } = Object.fromEntries(formDataResp) as { email: string, password: string }

    // Gets the admin client
    const { account } = await createAdminClient();

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const session = await account.createEmailPasswordSession(email, password);
    ; (await cookies()).set("session", session.secret, {
      httpOnly: true,
      sameSite: true,
      expires: new Date(session.expire),
      path: "/",
      secure: true
    })

    return NextResponse.json({ message: "Succefully login the user", success: true }, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: "Error in login route", message: error.message, success: false }, { status: 500 });
    }
  }
}