import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const res = NextResponse.json({ success: true }, { status: 200 });

    // ✅ clear the SAME cookie we set: admin_token
    res.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // delete
    });

    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
