// API route for fetching global market data

import { NextResponse } from "next/server"
import { coinGeckoAPI } from "@/lib/api/coinGecko"

export async function GET() {
  try {
    const data = await coinGeckoAPI.getGlobalData()

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching global market data:", error)
    return NextResponse.json({ error: "Failed to fetch global market data" }, { status: 500 })
  }
}
