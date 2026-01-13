import { NextRequest, NextResponse } from "next/server";
import { VerifyJWT } from "./tokenActions";

export type AuthContext = {
  user: {
    id: string
    name: string
    role: string
    email: string
    country: string
  }
}

export function requireAuth(
  handler: (req: NextRequest, ctx: AuthContext) => Promise<Response>
) {
  return async (req: NextRequest) => {
    const token =
      req.headers.get("authorization")?.replace("Bearer ", "") ??
      req.cookies.get("session")?.value

    if (!token) {
      return NextResponse.json(
        { error: "unauthorized" },
        { status: 401 }
      )
    }

    try {
      const claims = VerifyJWT(token)

      const ctx: AuthContext = {
        user: {
          id: claims.sub,
          name: claims.name,
          role: claims.role,
          email: claims.email,
          country: claims.country,
        },
      }

      return handler(req, ctx)
    } catch {
      return NextResponse.json(
        { error: "invalid or expired token" },
        { status: 401 }
      )
    }
  }
}
