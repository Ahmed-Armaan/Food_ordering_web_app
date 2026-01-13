import { requireAuth } from "@/lib/jwtToken/jwtMiddleware";
import { NextRequest } from "next/server";

export const GET = requireAuth(async (_: NextRequest, ctx) => {
	if (ctx.user.role === "MEMBER") {
		return Response.json(
			{ error: "unauthorized" },
			{ status: 401 }
		)
	}

	return Response.json(
		{ ok: true },
		{ status: 200 }
	)
})
