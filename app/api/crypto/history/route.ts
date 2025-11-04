// API route for fetching historical price data

import { NextResponse } from "next/server"
import { coinGeckoAPI } from "@/lib/api/coinGecko"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const coinId = searchParams.get("coin")
    const days = searchParams.get("days") || "7"

    if (!coinId) {
      return NextResponse.json({ error: "Coin ID is required" }, { status: 400 })
    }

    const data = await coinGeckoAPI.getCoinHistory(coinId, days === "max" ? "max" : Number.parseInt(days))

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching historical data:", error)
    return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 })
  }
}
