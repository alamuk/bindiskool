import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
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

export async function GET() {
  try {
    const cookieStore = await cookies();           // 👈 add await
    const adminToken = cookieStore.get("admin_token");

    if (!adminToken) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const jwtSecret = getJWTSecret();
    const { payload } = await jwtVerify(adminToken.value, jwtSecret);

    if (!payload.admin) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ authenticated: true }, { status: 200 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
