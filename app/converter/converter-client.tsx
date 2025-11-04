"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp } from "lucide-react"

const popularCryptos = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum" },
  { id: "binancecoin", symbol: "BNB", name: "Binance Coin" },
  { id: "cardano", symbol: "ADA", name: "Cardano" },
  { id: "solana", symbol: "SOL", name: "Solana" },
  { id: "ripple", symbol: "XRP", name: "Ripple" },
]

const fiatCurrencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
]

export function ConverterClient() {
  const [fromAmount, setFromAmount] = useState("1")
  const [fromCurrency, setFromCurrency] = useState("bitcoin")
  const [toCurrency, setToCurrency] = useState("USD")
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const handleConvert = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/crypto?ids=${fromCurrency}&vs_currencies=${toCurrency.toLowerCase()}`)
      const data = await response.json()

      if (data[fromCurrency]) {
        const rate = data[fromCurrency][toCurrency.toLowerCase()]
        setResult(Number.parseFloat(fromAmount) * rate)
      }
    } catch (error) {
      console.error("Conversion error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSwap = () => {
    // Only swap if both are cryptocurrencies
    if (popularCryptos.find((c) => c.symbol === toCurrency)) {
      const temp = fromCurrency
      setFromCurrency(toCurrency)
      setToCurrency(temp)
    }
  }

  useEffect(() => {
    if (fromAmount && fromCurrency && toCurrency) {
      handleConvert()
    }
  }, [fromAmount, fromCurrency, toCurrency])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Convert Cryptocurrency</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from-amount">From</Label>
            <div className="flex gap-2">
              <Input
                id="from-amount"
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-1"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {popularCryptos.map((crypto) => (
                    <SelectItem key={crypto.id} value={crypto.id}>
                      {crypto.symbol} - {crypto.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="icon" onClick={handleSwap} className="rounded-full bg-transparent">
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-currency">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD - US Dollar</SelectItem>
                <SelectItem value="EUR">EUR - Euro</SelectItem>
                <SelectItem value="GBP">GBP - British Pound</SelectItem>
                <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {result !== null && (
          <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">Result</p>
            <p className="text-3xl font-bold">
              {result.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {toCurrency}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
