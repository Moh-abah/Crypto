"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Map } from "lucide-react"
import { formatCurrency } from "@/lib/utils/formatters"

interface CoinData {
  id: string
  name: string
  symbol: string
  market_cap: number
  price_change_percentage_24h: number
  current_price: number
}

export default function MarketMapPage() {
  const [coins, setCoins] = useState<CoinData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/crypto?limit=50")
        if (!response.ok) throw new Error("Failed to fetch data")
        const data = await response.json()
        setCoins(data)
      } catch (err) {
        setError("Failed to load market data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0)

  const getBoxSize = (marketCap: number) => {
    const percentage = (marketCap / totalMarketCap) * 100
    return Math.max(percentage, 1) // Minimum 1%
  }

  const getColorClass = (change: number) => {
    if (change > 5) return "bg-green-600 hover:bg-green-700"
    if (change > 0) return "bg-green-500 hover:bg-green-600"
    if (change > -5) return "bg-red-500 hover:bg-red-600"
    return "bg-red-600 hover:bg-red-700"
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Map className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Market Map</h1>
              <p className="text-muted-foreground text-lg">Visual representation of market capitalization</p>
            </div>
          </div>
        </div>
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="border-destructive/50">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Map className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Market Map</h1>
            <p className="text-muted-foreground text-lg">Visual representation of market capitalization</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top 50 Cryptocurrencies by Market Cap</CardTitle>
          <CardDescription>
            Box size represents market capitalization. Color indicates 24h price change.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 min-h-[600px]">
            {coins.map((coin) => {
              const size = getBoxSize(coin.market_cap)
              const colorClass = getColorClass(coin.price_change_percentage_24h)

              return (
                <div
                  key={coin.id}
                  className={`${colorClass} rounded-lg p-3 transition-all duration-200 cursor-pointer flex flex-col justify-between text-white`}
                  style={{
                    gridColumn: size > 10 ? "span 2" : "span 1",
                    gridRow: size > 15 ? "span 2" : "span 1",
                    minHeight: "120px",
                  }}
                  title={`${coin.name} (${coin.symbol.toUpperCase()})\nMarket Cap: ${formatCurrency(coin.market_cap, true)}\nPrice: ${formatCurrency(coin.current_price)}\n24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%`}
                >
                  <div>
                    <div className="font-bold text-sm md:text-base">{coin.symbol.toUpperCase()}</div>
                    <div className="text-xs opacity-90 line-clamp-1">{coin.name}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs md:text-sm font-semibold">{formatCurrency(coin.current_price)}</div>
                    <div className="text-xs font-medium">
                      {coin.price_change_percentage_24h > 0 ? "+" : ""}
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
              <span className="text-sm">+5% or more</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span className="text-sm">0% to +5%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <span className="text-sm">0% to -5%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-600 rounded"></div>
              <span className="text-sm">-5% or less</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
