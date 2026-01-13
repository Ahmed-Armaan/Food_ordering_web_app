import { getCard } from "@/lib/graphqlQuery"
import { requireAuth } from "@/lib/jwtToken/jwtMiddleware"
import { NextRequest } from "next/server"

export const GET = requireAuth(async (_: NextRequest, ctx) => {
	if (ctx.user.role === "MANAGER") {
		const res = await fetch("http://localhost:3000/api/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: getCard,
				variables: { all: false },
			})
		})
		const paymentMethod = await res.json()

		return Response.json(
			{ "paymentmethod": paymentMethod.data.cards },
			{ status: 200 }
		)
	}

	if (ctx.user.role === "ADMIN") {
		const res = await fetch("http://localhost:3000/api/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: getCard,
				variables: { all: true }
			})
		})
		const paymentMethod = await res.json()

		return Response.json(
			{ "paymentmethod": paymentMethod.data.cards },
			{ status: 200 }
		)
	}

	if (ctx.user.role === "MEMBER") {
		return Response.json(
			{ "error": "unauthorized" },
			{ status: 402 }
		)
	}

	return Response.json(
		{ "error": "ISE" },
		{ status: 500 }
	)
})

export const POST = requireAuth(async (_: NextRequest, ctx) => {
	if (ctx.user.role === "ADMIN") {
		return Response.json(
			{ status: "accepted" },
			{ status: 202 }
		)
	}

	return Response.json(
		{ error: "not allowed" },
		{ status: 403 }
	)
})
