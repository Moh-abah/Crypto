import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/lib/utils/formatters"
import type { CoinMarket } from "@/lib/types/crypto"

interface CoinCardProps {
  coin: CoinMarket
}

export function CoinCard({ coin }: CoinCardProps) {
  const isPositive = coin.price_change_percentage_24h >= 0

  return (
    <Link href={`/${coin.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={coin.image || "/placeholder.svg"} alt={coin.name} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{coin.name}</h3>
                <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
              </div>
            </div>
            <span className="text-xs font-medium text-muted-foreground">#{coin.market_cap_rank}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold">{formatCurrency(coin.current_price)}</span>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {formatPercentage(coin.price_change_percentage_24h)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Market Cap</p>
                <p className="text-sm font-medium">{formatCurrency(coin.market_cap, true)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Volume 24h</p>
                <p className="text-sm font-medium">{formatCurrency(coin.total_volume, true)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
