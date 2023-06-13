import { NextResponse } from "next/server"

type Data = {
  name?: string,
  email?: string,
  message?: string
}
export async function POST(request: Request) {

  const data: Data = await request.json()

  return NextResponse.json(data)
}
