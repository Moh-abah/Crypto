// API route for fetching cryptocurrency market data

import { NextResponse } from "next/server"
import { coinGeckoAPI } from "@/lib/api/coinGecko"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const perPage = Number.parseInt(searchParams.get("per_page") || "100")
    const sparkline = searchParams.get("sparkline") === "true"

    const data = await coinGeckoAPI.getMarkets(page, perPage, sparkline)

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching crypto data:", error)
    return NextResponse.json({ error: "Failed to fetch cryptocurrency data" }, { status: 500 })
  }
}
