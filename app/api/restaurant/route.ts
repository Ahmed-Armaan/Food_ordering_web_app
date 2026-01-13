import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/jwtToken/jwtMiddleware"
import { getAllResteraunts } from "@/lib/graphqlQuery"

export const GET = requireAuth(
	async (_: NextRequest, ctx) => {
		var country = ctx.user.country
		if (!country) {
			return NextResponse.json({ "error": "fetch failed" })
		}
		if (country === "GLOBAL") {
			country = ""
		}

		const data = await fetch("http://localhost:3000/api/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: getAllResteraunts,
				variables: { country: country }
			})
		})

		const json = await data.json()
		return NextResponse.json(json.data.restaurants)
	}
)
