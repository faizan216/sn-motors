import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminSettings from "@/models/AdminSettings";
import crypto from "crypto";

function hashPassword(p) {
  return crypto.createHash("sha256").update(p).digest("hex");
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    if (username !== adminUsername) {
      return NextResponse.json({ success: false }, { status: 401 });
    }
    await dbConnect();
    const stored = await AdminSettings.findOne({ key: "admin_password" });
    const isValid = stored
      ? stored.value === hashPassword(password)
      : password === process.env.ADMIN_SECRET;
    if (isValid) {
      const res = NextResponse.json({ success: true });
      res.cookies.set("admin_token", password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return res;
    }
    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}