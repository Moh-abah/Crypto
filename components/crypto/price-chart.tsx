"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { formatCurrency } from "@/lib/utils/formatters"

interface PriceChartProps {
  data: Array<{ timestamp: number; price: number }>
  coinName: string
}

type TimeRange = "24H" | "7D" | "1M" | "3M" | "1Y" | "ALL"

export function PriceChart({ data, coinName }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("7D")

  const timeRanges: TimeRange[] = ["24H", "7D", "1M", "3M", "1Y", "ALL"]

  const chartData = data.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    price: item.price,
  }))
  const firstPrice = data[0]?.price ?? 0
  const lastPrice = data[data.length - 1]?.price ?? 0
  const isUp = lastPrice >= firstPrice
  const lineColor = isUp ? "#22c55e" : "#ef4444" // أخضر أو أحمر


  return (
    
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{coinName} Price Chart</CardTitle>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => formatCurrency(value, true)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [formatCurrency(value), "Price"]}
            />
            <Line type="monotone" dataKey="price" stroke={lineColor} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
