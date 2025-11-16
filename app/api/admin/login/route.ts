import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { getJWTSecret } from "@/app/api/admin/auth";

const ADMIN_LOGIN_ID = process.env.ADMIN_LOGIN_ID;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  try {
    if (!ADMIN_LOGIN_ID || !ADMIN_PASSWORD) {
      console.error("Missing ADMIN_LOGIN_ID or ADMIN_PASSWORD in env");
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const { identifier, password } = (await req.json()) as {
      identifier?: string;
      password?: string;
    };

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Missing identifier or password" },
        { status: 400 }
      );
    }

    const normalizedEnvId = ADMIN_LOGIN_ID.trim().toLowerCase();
    const normalizedInput = identifier.trim().toLowerCase();

    const isIdValid = normalizedInput === normalizedEnvId;
    const isPasswordValid = password === ADMIN_PASSWORD;

    if (!isIdValid || !isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid login details" },
        { status: 401 }
      );
    }

    // ✅ Create JWT payload
    const jwtSecret = getJWTSecret();
    const token = await new SignJWT({ admin: true })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h") // 8 hours
      .sign(jwtSecret);

    const res = NextResponse.json({ ok: true }, { status: 200 });

    // ✅ Set cookie that requireAdmin() will verify
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8, // 8h
    });

    return res;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}








