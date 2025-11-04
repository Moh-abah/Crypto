import { ConverterClient } from "./converter-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cryptocurrency Converter",
  description: "Convert between different cryptocurrencies and fiat currencies with real-time exchange rates.",
}

export default function ConverterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Cryptocurrency Converter</h1>
          <p className="text-muted-foreground text-lg">Convert between cryptocurrencies and fiat currencies</p>
        </div>

        <ConverterClient />
      </div>
    </div>
  )
}
