"use client";

import { useEffect, useState } from "react";
import { getAllUserQuery } from "@/lib/graphqlQuery";
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  name: string;
  role: string;
  country: string;
};

export default function LoginPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: getAllUserQuery }),
      })

      const json = await res.json()
      setUsers(json.data.users)
    }

    fetchUsers()
  }, [])

  const login = async (user: User) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id }),
    })

    if (!res.ok) {
      console.error("Login failed")
      return
    }

    router.refresh()
    router.push("/home")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl px-6">
        <h1 className="text-3xl font-semibold text-center mb-2">
          getFoods...
        </h1>
        <p className="text-center opacity-70 mb-8">
          Select a user to continue
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => login(user)}
              className="w-full rounded-lg border p-4 text-left transition hover:opacity-80"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{user.name}</span>
                <span className="text-sm opacity-70">{user.role}</span>
              </div>

              <div className="mt-1 text-sm opacity-70">
                Country: {user.country}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
