//E:\CryptoTreadWebsite\app\[coin]\page.tsx
import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { coinGeckoAPI } from "@/lib/api/coinGecko"
import { PriceChart } from "@/components/crypto/price-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, TrendingDown, ExternalLink, Clock } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/lib/utils/formatters"
import type { Metadata } from "next"



interface PageProps {
  params: Promise<{ coin: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { coin } = await params
  const coinData = await coinGeckoAPI.getCoinDetail(coin)

  return {
    title: `${coinData.name} (${coinData.symbol.toUpperCase()}) Price | CryptoPriceTracker`,
    description: `Live ${coinData.name} price, market cap, charts, and detailed cryptocurrency information. Track ${coinData.name} (${coinData.symbol.toUpperCase()}) price changes in real-time.`,
    keywords: `${coinData.name}, ${coinData.symbol}, ${coinData.name} price, ${coinData.symbol} price, cryptocurrency`,
  }
}

async function CoinDetails({ coinId }: { coinId: string }) {
  const coinData = await coinGeckoAPI.getCoinDetail(coinId)
  const historyData = await coinGeckoAPI.getCoinHistory(coinId, 7)

  if (!coinData) {
    notFound()
  }

  const isPositive = coinData.market_data.price_change_percentage_24h >= 0

  const chartData = historyData.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
  }))

  return (
    <div className="space-y-8">
      {/* Coin Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={coinData.image.large || "/placeholder.svg"}
            alt={coinData.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">{coinData.name}</h1>
              <Badge variant="secondary" className="text-lg">
                {coinData.symbol.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Rank #{coinData.market_cap_rank}</span>
            </div>
          </div>
        </div>

        <div className="text-left md:text-right">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-bold">{formatCurrency(coinData.market_data.current_price.usd)}</span>
            <div
              className={`flex items-center gap-1 text-lg font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
              {formatPercentage(coinData.market_data.price_change_percentage_24h)}
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/${coinId}/price-history`}>
              <Clock className="h-4 w-4 mr-2" />
              Price History
            </Link>
          </Button>
        </div>
      </div>

      {/* Price Chart */}
      <PriceChart data={chartData} coinName={coinData.name} />

      {/* Market Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(coinData.market_data.market_cap.usd, true)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">24h Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(coinData.market_data.total_volume.usd, true)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Circulating Supply</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {coinData.market_data.circulating_supply.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              <span className="text-sm text-muted-foreground">{coinData.symbol.toUpperCase()}</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">All-Time High</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(coinData.market_data.ath.usd)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(coinData.market_data.ath_date.usd).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* About */}
      {coinData.description.en && (
        <Card>
          <CardHeader>
            <CardTitle>About {coinData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: coinData.description.en.split(". ").slice(0, 3).join(". ") + ".",
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle>Official Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {coinData.links.homepage[0] && (
              <Button variant="outline" size="sm" asChild>
                <a href={coinData.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                  Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
            {coinData.links.blockchain_site[0] && (
              <Button variant="outline" size="sm" asChild>
                <a href={coinData.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">
                  Explorer
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Skeleton className="h-96 w-full" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    </div>
  )
}

export default async function CoinPage({ params }: PageProps) {
  const { coin } = await params

  return (
    <div className="container mx-auto px-4 py-12">
      <Suspense fallback={<LoadingSkeleton />}>
        <CoinDetails coinId={coin} />
      </Suspense>
    </div>
  )
}
