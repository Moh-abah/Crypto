"use client"

import { useState } from "react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency, formatPercentage } from "@/lib/utils/formatters"
import type { CoinMarket } from "@/lib/types/crypto"
import { Input } from "@/components/ui/input"

interface CoinTableProps {
  coins: CoinMarket[]
}

export function CoinTable({ coins }: CoinTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search cryptocurrencies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-16">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">24h %</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
              <TableHead className="text-right">Volume (24h)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoins.map((coin) => {
              const isPositive = coin.price_change_percentage_24h >= 0

              return (
                <TableRow key={coin.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{coin.market_cap_rank}</TableCell>
                  <TableCell>
                    <Link href={`/${coin.id}`} className="flex items-center gap-3 hover:text-primary transition-colors">
                      <img src={coin.image || "/placeholder.svg"} alt={coin.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-medium">{coin.name}</p>
                        <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(coin.current_price)}</TableCell>


                  <TableCell className="text-right">
                    <div
                      className={`flex items-center justify-end gap-1 font-medium ${coin.price_change_percentage_24h && coin.price_change_percentage_24h >= 0
                          ? "text-green-600"
                          : "text-red-600"
                        }`}
                    >
                      {coin.price_change_percentage_24h && coin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {coin.price_change_percentage_24h !== null
                        ? formatPercentage(coin.price_change_percentage_24h)
                        : "N/A"}
                    </div>
                  </TableCell>

                  <TableCell className="text-right">{formatCurrency(coin.market_cap, true)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(coin.total_volume, true)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
