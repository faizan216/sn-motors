import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import AdminSettings from "@/models/AdminSettings";
import crypto from "crypto";

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(request) {
  try {
    // Verify admin is logged in
    const cookieStore = cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const { currentPassword, newPassword, confirmPassword } = await request.json();

    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, error: "New password must be at least 8 characters" }, { status: 400 });
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ success: false, error: "New passwords do not match" }, { status: 400 });
    }

    // Get stored password - check MongoDB first, fallback to env
    const storedSetting = await AdminSettings.findOne({ key: "admin_password" });
    const envPassword = process.env.ADMIN_SECRET;

    let isCurrentCorrect = false;

    if (storedSetting) {
      // Compare with hashed password in MongoDB
      isCurrentCorrect = storedSetting.value === hashPassword(currentPassword);
    } else {
      // First time - compare with env variable directly
      isCurrentCorrect = currentPassword === envPassword;
    }

    if (!isCurrentCorrect) {
      return NextResponse.json({ success: false, error: "Current password is incorrect" }, { status: 400 });
    }

    // Save new hashed password to MongoDB
    await AdminSettings.findOneAndUpdate(
      { key: "admin_password" },
      { key: "admin_password", value: hashPassword(newPassword) },
      { upsert: true, new: true }
    );

    // Update the cookie with new password
    const response = NextResponse.json({ success: true, message: "Password changed successfully" });
    response.cookies.set("admin_token", newPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
