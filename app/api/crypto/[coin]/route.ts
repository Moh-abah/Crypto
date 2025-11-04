// API route for fetching specific coin details

import { NextResponse } from "next/server"
import { coinGeckoAPI } from "@/lib/api/coinGecko"

export async function GET(request: Request, { params }: { params: Promise<{ coin: string }> }) {
  try {
    const { coin } = await params

    const data = await coinGeckoAPI.getCoinDetail(coin)

    return NextResponse.json(data)
  } catch (error) {
    console.error(`[v0] Error fetching ${(await params).coin} data:`, error)
    return NextResponse.json({ error: "Failed to fetch coin data" }, { status: 500 })
  }
}
