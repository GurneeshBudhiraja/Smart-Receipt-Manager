import { createSessionClient } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";
export async function POST() {
  try {
    const clientSession = await createSessionClient();
    if (!clientSession) {
      return NextResponse.json({ message: "No logged in user found", success: false }, { status: 401 })
    }
    const { account } = clientSession;
    const { $id } = await account.getSession("current");

    await account.deleteSession($id);
    return NextResponse.json({ message: "Log out route", success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ message: "Not able to logout the user", success: false }, { status: 500 })
  }
}