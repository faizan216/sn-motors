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

    const adminEmail = process.env.ADMIN_EMAIL;
    const resendKey  = process.env.RESEND_API_KEY;

    if (resendKey && adminEmail) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from:    "SN Motors Admin <onboarding@resend.dev>",
          to:      [adminEmail],
          subject: "SN Motors — Admin Password Reset Code",
          html: `
            <div style="font-family:sans-serif;max-width:400px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;">
              <h2 style="color:#2563EB;">SN Motors Admin</h2>
              <p style="color:#6b7280;font-size:14px;">Your password reset code is:</p>
              <div style="background:#f3f4f6;border-radius:8px;padding:20px;text-align:center;margin:16px 0;">
                <span style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#111;">${code}</span>
              </div>
              <p style="color:#6b7280;font-size:13px;">This code expires in <strong>15 minutes</strong>.</p>
              <p style="color:#6b7280;font-size:13px;">If you did not request this, ignore this email.</p>
            </div>
          `,
        }),
      });
    }

    console.log(`=== ADMIN RESET CODE: ${code} ===`);

    return NextResponse.json({
      success: true,
      message: adminEmail
        ? `Reset code sent to ${adminEmail}. Check your inbox.`
        : "Reset code generated. Check Vercel logs.",
    });
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
    await AdminSettings.findOneAndUpdate(
      { key: "admin_password" },
      { key: "admin_password", value: hashPassword(newPassword) },
      { upsert: true }
    );
    await AdminSettings.deleteOne({ key: "reset_code" });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}