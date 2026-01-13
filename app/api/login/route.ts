import { SignToken } from "@/lib/jwtToken/tokenActions"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
	const { id } = await req.json()

	if (!id) {
		return NextResponse.json({ error: "missing id" }, { status: 400 })
	}

	const token = await SignToken(id)

	const res = NextResponse.json({ success: true })
	res.cookies.set("session", token, {
		httpOnly: true,
		sameSite: "lax",
		path: "/"
	})

	return res
}
