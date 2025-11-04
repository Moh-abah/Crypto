import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Activity, Percent } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/lib/utils/formatters"

interface MarketStatsProps {
  totalMarketCap: number
  totalVolume: number
  btcDominance: number
  marketCapChange24h: number
}

export function MarketStats({ totalMarketCap, totalVolume, btcDominance, marketCapChange24h }: MarketStatsProps) {
  const stats = [
    {
      label: "Total Market Cap",
      value: formatCurrency(totalMarketCap, true),
      icon: DollarSign,
      change: marketCapChange24h,
    },
    {
      label: "24h Volume",
      value: formatCurrency(totalVolume, true),
      icon: Activity,
      change: null,
    },
    {
      label: "BTC Dominance",
      value: `${btcDominance.toFixed(1)}%`,
      icon: Percent,
      change: null,
    },
    {
      label: "Market Trend",
      value: marketCapChange24h >= 0 ? "Bullish" : "Bearish",
      icon: TrendingUp,
      change: marketCapChange24h,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const isPositive = stat.change !== null && stat.change >= 0

        return (
          <Card key={stat.label} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                {stat.change !== null && (
                  <span className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {formatPercentage(stat.change)}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
