// API route for fetching trending coins

import { NextResponse } from "next/server"
import { coinGeckoAPI } from "@/lib/api/coinGecko"

export async function GET() {
  try {
    const data = await coinGeckoAPI.getTrending()

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching trending coins:", error)
    return NextResponse.json({ error: "Failed to fetch trending coins" }, { status: 500 })
  }
}
