'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Resteraunt = {
  id: number,
  name: string,
}

export default function Home() {
  const router = useRouter()
  const [restaurants, setResteraaunts] = useState<Resteraunt[]>([])

  useEffect(() => {
    const getRestaurants = async () => {
      const res = await fetch('/api/restaurant', {
        credentials: "include"
      })

      if (!res.ok) {
        console.log("Error fetching restaurants")
      }

      const data = await res.json()
      setResteraaunts(data)
    }

    getRestaurants()
  }, [])

  return (
    <div className="min-h-screen px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Restaurants</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map(r => (
          <div
            key={r.id}
            className="border rounded-lg p-4 hover:opacity-80 transition"
            onClick={() => router.push(`/resteraunt/${r.id}/`)}
          >
            <div className="font-medium">{r.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
