import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { createHash } from "crypto";

function getJWTSecret(): Uint8Array {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD must be configured");
  }

  return createHash("sha256")
    .update("jwt-secret-salt:" + adminPassword)
    .digest();
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin password not configured" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    const jwtSecret = getJWTSecret();
    const token = await new SignJWT({ admin: true })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(jwtSecret);

    // ✅ Set cookie using NextResponse, not cookies()
    const res = NextResponse.json({ success: true }, { status: 200 });

    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
