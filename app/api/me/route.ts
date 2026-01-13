import { NextRequest } from "next/server"
import { requireAuth } from "@/lib/jwtToken/jwtMiddleware"

export const GET = requireAuth(async (_: NextRequest, ctx) => {
	return Response.json({
		name: ctx.user.name,
	})
})
