import { NextRequest, NextResponse } from "next/server";
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

export async function requireAdmin(
  request: NextRequest
): Promise<NextResponse | null> {
  try {
    const cookieStore = await cookies();          // 👈 add await
    const adminToken = cookieStore.get("admin_token");

    if (!adminToken) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    const jwtSecret = getJWTSecret();
    const { payload } = await jwtVerify(adminToken.value, jwtSecret);

    if (!payload.admin) {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      );
    }

    return null;
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized - Invalid token" },
      { status: 401 }
    );
  }
}
