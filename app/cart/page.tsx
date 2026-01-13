"use client"

import { useState } from "react"
import { useCart } from "../context/cartContext"
import { useRouter } from "next/navigation"

type Card = {
  id: string
  brand: string
  last4: string
  isDefault: boolean
}

export default function CartPage() {
  const [unauthorized, setUnauthorized] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [cards, setCards] = useState<Card[]>([])

  const { items, removeItem, clear } = useCart()
  const router = useRouter()

  const total = items.reduce((sum, i) => sum + i.price, 0)

  const checkOut = async () => {
    const res = await fetch("/api/checkout", {
      method: "GET",
      credentials: "include",
    })

    if (!res.ok) {
      setUnauthorized(true)
      return
    }

    setOrderPlaced(true)
    setShowPayment(true)

    const paymentRes = await fetch("/api/paymentMethods", {
      method: "GET",
      credentials: "include",
    })

    if (!paymentRes.ok) return

    const json = await paymentRes.json()
    console.log(json)
    setCards(json.paymentmethod)
  }


  const addPaymentMethod = async () => {
    const res = await fetch("/api/paymentMethods", {
      method: "POST",
      credentials: "include",
    })

    if (res.status !== 202) return

    setCards(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        brand: "VISA",
        last4: "0000",
        isDefault: false,
      }
    ])
  }

  if (items.length === 0 && !showPayment) {
    return (
      <div className="p-6">
        <p>Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Cart</h1>

      {unauthorized && (
        <div className="mb-4 border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-600">
          Unauthorized
        </div>
      )}

      {!showPayment && (
        <>
          <div className="space-y-3 mb-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm opacity-70">₹{item.price}</div>
                </div>

                <button
                  onClick={() => removeItem(i)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total</span>
            <span className="font-medium">₹{total}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/home")}
              className="border px-4 py-2 rounded"
            >
              Continue shopping
            </button>

            <button
              onClick={checkOut}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {showPayment && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Choose payment method
          </h2>

          <div className="space-y-3">
            {cards.map(card => (
              <button
                key={card.id}
                className="w-full border rounded p-4 flex justify-between hover:bg-gray-50"
                onClick={() => {
                  clear()
                  router.push("/home")
                }}
              >
                <span>
                  {card.brand} •••• {card.last4}
                </span>

                {card.isDefault && (
                  <span className="text-sm opacity-60">Default</span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={addPaymentMethod}
            className="mt-4 w-full border rounded px-4 py-2 hover:bg-gray-100"
          >
            Add payment method
          </button>
        </div>
      )}
    </div>
  )
}
