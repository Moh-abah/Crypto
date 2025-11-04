import type { MetadataRoute } from "next"
import { coinGeckoAPI } from "@/lib/api/coinGecko"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://cryptotr.vercel.app"

  // Static pages
  const staticPages = ["", "/markets", "/trending", "/top-cryptocurrencies", "/converter", "/market-map"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1 : 0.8,
    }),
  )

  // Dynamic coin pages
  let coinPages: MetadataRoute.Sitemap = []
  try {
    const coins = await coinGeckoAPI.getMarkets(1, 50, false)
    coinPages = coins.map((coin) => ({
      url: `${baseUrl}/${coin.id}`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.9,
    }))
  } catch (error) {
    console.error("Error generating sitemap:", error)
  }

  return [...staticPages, ...coinPages]
}
