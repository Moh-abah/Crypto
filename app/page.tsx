import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { coinGeckoAPI } from "@/lib/api/coinGecko"
import { MarketStats } from "@/components/crypto/market-stats"
import { TrendingCoins } from "@/components/crypto/trending-coins"
import { CoinCard } from "@/components/crypto/coin-card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight, TrendingUp } from "lucide-react"

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

async function TrendingSection() {
  const trendingData = await coinGeckoAPI.getTrending()

  return (
    <TrendingCoins
      coins={trendingData.coins.slice(0, 7).map((coin) => ({
        id: coin.item.id,
        name: coin.item.name,
        symbol: coin.item.symbol,
        market_cap_rank: coin.item.market_cap_rank,
        thumb: coin.item.thumb,
      }))}
    />
  )
}

async function TopCoins() {
  const markets = await coinGeckoAPI.getMarkets(1, 8, false)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {markets.map((coin) => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="h-96 w-full" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-blue-500/5 border-b border-border/40">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <TrendingUp className="h-4 w-4" />
              Real-Time Cryptocurrency Tracking
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
              Track Cryptocurrency Prices in{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Real-Time</span>
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Access accurate data, interactive charts, and powerful analytics for thousands of cryptocurrencies. Make
              informed investment decisions with CryptoPriceTracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="text-base">
                <Link href="/markets">
                  Explore Markets
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base bg-transparent">
                <Link href="/converter">Currency Converter</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        <Suspense fallback={<LoadingSkeleton />}>
          <div className="space-y-16">
            {/* Market Overview Stats */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Global Market Overview</h2>
              <MarketOverview />
            </section>

            {/* Trending & Top Coins */}
            <section className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">Top Cryptocurrencies</h2>
                  <Button variant="ghost" asChild>
                    <Link href="/top-cryptocurrencies">
                      View All
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <TopCoins />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Trending</h2>
                <TrendingSection />
              </div>
            </section>
          </div>
        </Suspense>
      </div>
    </div>
  )
}
