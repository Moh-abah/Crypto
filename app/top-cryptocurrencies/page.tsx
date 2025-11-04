import { Suspense } from "react"
import { coinGeckoAPI } from "@/lib/api/coinGecko"
import { CoinTable } from "@/components/crypto/coin-table"
import { Skeleton } from "@/components/ui/skeleton"
import { Trophy } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Cryptocurrencies by Market Cap",
  description: "Complete list of top cryptocurrencies ranked by market capitalization with real-time prices and data.",
}

async function TopCryptoList() {
  const markets = await coinGeckoAPI.getMarkets(1, 250, false)

  return <CoinTable coins={markets} />
}

function LoadingSkeleton() {
  return <Skeleton className="h-96 w-full" />
}

export default function TopCryptocurrenciesPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Trophy className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Top Cryptocurrencies</h1>
            <p className="text-muted-foreground text-lg">Complete ranking by market capitalization</p>
          </div>
        </div>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <TopCryptoList />
      </Suspense>
    </div>
  )
}
