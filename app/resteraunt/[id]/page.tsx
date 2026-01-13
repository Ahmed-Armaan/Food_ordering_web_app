"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getMenu } from "@/lib/graphqlQuery"

type MenuItem = {
	name: string
	price: number
}

export default function RestaurantMenuPage() {
	const { id } = useParams()
	const [menu, setMenu] = useState<MenuItem[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchMenu = async () => {
			const res = await fetch("/api/graphql", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({
					query: getMenu,
					variables: { restaurantId: id }
				})
			})

			const json = await res.json()
			setMenu(json.data.restaurant.menu)
			setLoading(false)
		}

		fetchMenu()
	}, [id])

	if (loading) {
		return <div className="p-6">Loading...</div>
	}

	return (
		<div className="min-h-screen px-6 py-8">
			<h1 className="text-2xl font-semibold mb-6">Menu</h1>

			<div className="space-y-3">
				{menu.map((item, i) => (
					<div
						key={i}
						className="border rounded-lg p-4 flex items-center justify-between"
					>
						<div>
							<div className="font-medium">{item.name}</div>
							<div className="text-sm opacity-70">₹{item.price}</div>
						</div>

						<button
							className="px-4 py-1.5 text-sm rounded-md border hover:bg-black hover:text-white transition"
							onClick={() => {
								console.log("add to cart:", item)
							}}
						>
							Add
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
