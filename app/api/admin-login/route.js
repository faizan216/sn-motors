import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminSettings from "@/models/AdminSettings";
import crypto from "crypto";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request) {
  try {
    const { password } = await request.json();

    await dbConnect();

    // Check MongoDB first for custom password
    const storedSetting = await AdminSettings.findOne({ key: "admin_password" });

    let isValid = false;

    if (storedSetting) {
      // Compare with hashed password stored in MongoDB
      isValid = storedSetting.value === hashPassword(password);
    } else {
      // Fallback to env variable (first time / not yet changed)
      isValid = password === process.env.ADMIN_SECRET;
    }

    if (isValid) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_token", password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    // Fallback to env if DB fails
    const { password } = await request.json().catch(() => ({ password: "" }));
    if (password === process.env.ADMIN_SECRET) {
      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_token", password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      return response;
    }
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
