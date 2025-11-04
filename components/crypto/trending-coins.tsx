import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TrendingCoin {
  id: string
  name: string
  symbol: string
  market_cap_rank: number
  thumb: string
}

interface TrendingCoinsProps {
  coins: TrendingCoin[]
}

export function TrendingCoins({ coins }: TrendingCoinsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Coins
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {coins.map((coin, index) => (
            <Link
              key={coin.id}
              href={`/${coin.id}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="w-8 h-8 flex items-center justify-center">
                  {index + 1}
                </Badge>
                <img src={coin.thumb || "/placeholder.svg"} alt={coin.name} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors">{coin.name}</p>
                  <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                </div>
              </div>
              <Badge variant="outline">#{coin.market_cap_rank}</Badge>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
