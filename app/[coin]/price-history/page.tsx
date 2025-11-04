import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { coinGeckoAPI } from "@/lib/api/coinGecko"
import { PriceChart } from "@/components/crypto/price-chart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft } from "lucide-react"
import { formatCurrency } from "@/lib/utils/formatters"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ coin: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { coin } = await params
  const coinData = await coinGeckoAPI.getCoinDetail(coin)

  return {
    title: `${coinData.name} Price History`,
    description: `Historical price data and charts for ${coinData.name} (${coinData.symbol.toUpperCase()}).`,
  }
}

async function PriceHistory({ coinId }: { coinId: string }) {
  const coinData = await coinGeckoAPI.getCoinDetail(coinId)
  const historyData = await coinGeckoAPI.getCoinHistory(coinId, 365)

  if (!coinData) {
    notFound()
  }

  const chartData = historyData.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
  }))

  // Calculate statistics
  const prices = historyData.prices.map(([, price]) => price)
  const highestPrice = Math.max(...prices)
  const lowestPrice = Math.min(...prices)
  const averagePrice = prices.reduce((a, b) => a + b, 0) / prices.length

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/${coinId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-4xl font-bold">{coinData.name} Price History</h1>
          <p className="text-muted-foreground">Historical price data for {coinData.symbol.toUpperCase()}</p>
        </div>
      </div>

      <PriceChart data={chartData} coinName={coinData.name} />

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Highest Price (365d)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(highestPrice)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Lowest Price (365d)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(lowestPrice)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Price (365d)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(averagePrice)}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-12 w-96" />
      <Skeleton className="h-96 w-full" />
      <div className="grid gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    </div>
  )
}

export default async function PriceHistoryPage({ params }: PageProps) {
  const { coin } = await params

  return (
    <div className="container mx-auto px-4 py-12">
      <Suspense fallback={<LoadingSkeleton />}>
        <PriceHistory coinId={coin} />
      </Suspense>
    </div>
  )
}
