import { Suspense } from "react"
import Link from "next/link"
import { coinGeckoAPI } from "@/lib/api/coinGecko"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Flame } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trending Cryptocurrencies",
  description: "Discover the most searched and trending cryptocurrencies in the market right now.",
}

async function TrendingList() {
  const trendingData = await coinGeckoAPI.getTrending()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trendingData.coins.map((coin, index) => (
        <Link key={coin.item.id} href={`/${coin.item.id}`}>
          <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={coin.item.thumb || "/placeholder.svg"}
                    alt={coin.item.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <CardTitle className="group-hover:text-primary transition-colors">{coin.item.name}</CardTitle>
                    <CardDescription className="uppercase">{coin.item.symbol}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg font-bold">
                  #{index + 1}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Market Rank</span>
                  <Badge variant="outline">#{coin.item.market_cap_rank}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Score</span>
                  <Badge variant="secondary">{coin.item.score}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(15)].map((_, i) => (
        <Skeleton key={i} className="h-48 w-full" />
      ))}
    </div>
  )
}

export default function TrendingPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Flame className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Trending Cryptocurrencies</h1>
            <p className="text-muted-foreground text-lg">Most searched cryptocurrencies in the last 24 hours</p>
          </div>
        </div>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <TrendingList />
      </Suspense>
    </div>
  )
}
