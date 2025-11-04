import { Suspense } from "react"
import { coinGeckoAPI } from "@/lib/api/coinGecko"
import { MarketStats } from "@/components/crypto/market-stats"
import { CoinTable } from "@/components/crypto/coin-table"
import { Skeleton } from "@/components/ui/skeleton"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cryptocurrency Markets",
  description: "Explore global cryptocurrency markets with real-time data, prices, and market statistics.",
}

async function MarketOverview() {
  const globalData = await coinGeckoAPI.getGlobalData()
  const { data } = globalData

  return (
    <MarketStats
      totalMarketCap={data.total_market_cap.usd}
      totalVolume={data.total_volume.usd}
      btcDominance={data.market_cap_percentage.btc}
      marketCapChange24h={data.market_cap_change_percentage_24h_usd}
    />
  )
}

async function MarketsTable() {
  const markets = await coinGeckoAPI.getMarkets(1, 100, false)

  return <CoinTable coins={markets} />
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  )
}

export default function MarketsPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Cryptocurrency Markets</h1>
        <p className="text-muted-foreground text-lg">Real-time market data for all major cryptocurrencies</p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <div className="space-y-8">
          <MarketOverview />
          <MarketsTable />
        </div>
      </Suspense>
    </div>
  )
}
