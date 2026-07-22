import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AdminSettings from "@/models/AdminSettings";
import crypto from "crypto";

function hashPassword(p) {
  return crypto.createHash("sha256").update(p).digest("hex");
}

export async function POST() {
  try {
    const code   = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 15 * 60 * 1000;
    await dbConnect();
    await AdminSettings.findOneAndUpdate(
      { key: "reset_code" },
      { key: "reset_code", value: JSON.stringify({ code, expiry }) },
      { upsert: true }
    );
    console.log(`=== ADMIN RESET CODE: ${code} (valid 15 min) ===`);
    return NextResponse.json({ success: true, message: "Code generated. Check Vercel logs for the 6-digit code." });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { code, newPassword } = await request.json();
    if (!code || !newPassword || newPassword.length < 8) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }
    await dbConnect();
    const stored = await AdminSettings.findOne({ key: "reset_code" });
    if (!stored) return NextResponse.json({ success: false, error: "No reset code found. Request a new one." }, { status: 400 });
    const { code: savedCode, expiry } = JSON.parse(stored.value);
    if (Date.now() > expiry) return NextResponse.json({ success: false, error: "Code expired. Request a new one." }, { status: 400 });
    if (code !== savedCode) return NextResponse.json({ success: false, error: "Incorrect code." }, { status: 400 });
    await AdminSettings.findOneAndUpdate({ key: "admin_password" }, { key: "admin_password", value: hashPassword(newPassword) }, { upsert: true });
    await AdminSettings.deleteOne({ key: "reset_code" });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}