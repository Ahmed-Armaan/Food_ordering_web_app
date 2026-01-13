import { getUserInfo } from "../graphqlQuery"
import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken"

export async function SignToken(id: string) {
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: getUserInfo,
      variables: { userId: id }
    })
  })

  if (!res.ok) {
    throw new Error("failed to fetch user info")
  }

  const json = await res.json()
  const { name, country, role, email } = json.data.user

  const payload = {
    sub: id,
    name,
    role,
    email,
    country,
  }

  const key = process.env.JWT_KEY!
  return jwt.sign(payload, key, {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: "getFoods",
  })
}

export type AuthClaims = JwtPayload & {
  sub: string
  name: string
  role: string
  email: string
  country: string
}

export function VerifyJWT(token: string): AuthClaims {
  const key = process.env.JWT_KEY
  if (!key) throw new Error("jwt key missing")

  const decoded = jwt.verify(token, key, {
    algorithms: ["HS256"],
    issuer: "getFoods",
  })

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    !("sub" in decoded)
  ) {
    throw new Error("invalid jwt payload")
  }

  return decoded as AuthClaims
}
