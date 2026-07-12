import { NextResponse } from "next/server";

// Simple base64 image storage - saves to a public URL via imgbb free API
// Or we just return base64 as data URL for simplicity
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: "Only JPG, PNG, WEBP, GIF allowed" }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File size must be under 5MB" }, { status: 400 });
    }

    // Convert to base64
    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${file.type};base64,${base64}`;

    // Upload to imgbb (free image hosting) if API key exists
    const imgbbKey = process.env.IMGBB_API_KEY;

    if (imgbbKey) {
      const formDataImgbb = new FormData();
      formDataImgbb.append("image", base64);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
        method: "POST",
        body:   formDataImgbb,
      });

      const json = await res.json();
      if (json.success) {
        return NextResponse.json({
          success: true,
          url: json.data.url,
          display_url: json.data.display_url,
        });
      }
    }

    // Fallback: return base64 data URL
    return NextResponse.json({
      success: true,
      url: dataUrl,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
