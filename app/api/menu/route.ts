import { NextRequest, NextResponse } from "next/server"
import { requireAuth } from "@/lib/jwtToken/jwtMiddleware"
import { getMenu } from "@/lib/graphqlQuery"

export const GET = requireAuth(
	async (req: NextRequest) => {
		const { searchParams } = new URL(req.url)
		const restaurantId = searchParams.get("restaurantId")

		if (!restaurantId) {
			return NextResponse.json({ error: "missing restaurantId" }, { status: 400 })
		}

		const res = await fetch("http://localhost:3000/api/graphql", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: getMenu,
				variables: { restaurantId }
			})
		})

		if (!res.ok) {
			return NextResponse.json({ error: "graphql failed" }, { status: 500 })
		}

		const json = await res.json()
		return NextResponse.json(json.data.restaurant.menu)
	}
)
