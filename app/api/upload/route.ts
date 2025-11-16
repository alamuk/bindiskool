import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs"; // safer for file uploads

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // optional: limit size (example: 10 MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 413 }
      );
    }

    // Give each upload a unique path
    const fileName = `blog/${Date.now()}-${file.name}`;

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: "public", // so you can use the URL directly in <img>
    });

    // Return the URL to the client
    return NextResponse.json(
      { url: blob.url },
      { status: 200 }
    );
  } catch (error) {
    console.error("Blob upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
