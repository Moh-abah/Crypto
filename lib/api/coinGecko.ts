// CoinGecko API service - Primary data source

import { memoryCache } from "@/lib/cache/memoryCache"
import { CACHE_CONFIG } from "@/lib/cache/cacheConfig"
import type { CoinMarket, CoinDetail, CoinHistory, GlobalMarketData, TrendingData } from "@/lib/types/crypto"

const BASE_URL = "https://api.coingecko.com/api/v3"

async function fetchWithCache<T>(url: string, cacheKey: string, ttl: number): Promise<T> {
  // Check cache first
  const cached = memoryCache.get<T>(cacheKey)
  if (cached) {
    return cached
  }

  try {
    // Fetch from API with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

    const response = await fetch(url, {
      next: { revalidate: ttl },
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()

    // Store in cache
    memoryCache.set(cacheKey, data, ttl)

    return data
  } catch (error) {
    console.error(`[CoinGecko] Error fetching data for ${cacheKey}:`, error)
    throw error
  }
}

export const coinGeckoAPI = {
  // Get market data for multiple coins
  async getMarkets(page = 1, perPage = 100, sparkline = true): Promise<CoinMarket[]> {
    const cacheKey = `${CACHE_CONFIG.LIVE_PRICES.key}-${page}-${perPage}`
    const url = `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=7d`

    return fetchWithCache<CoinMarket[]>(url, cacheKey, CACHE_CONFIG.LIVE_PRICES.ttl)
  },

  // Get detailed data for a specific coin
  async getCoinDetail(coinId: string): Promise<CoinDetail> {
    const cacheKey = `${CACHE_CONFIG.COIN_DETAIL.key}-${coinId}`
    const url = `${BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=true`

    return fetchWithCache<CoinDetail>(url, cacheKey, CACHE_CONFIG.COIN_DETAIL.ttl)
  },

  // Get historical market data
  async getCoinHistory(coinId: string, days: number | "max" = 7): Promise<CoinHistory> {
    const cacheKey = `${CACHE_CONFIG.HISTORICAL.key}-${coinId}-${days}`
    const url = `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`

    return fetchWithCache<CoinHistory>(url, cacheKey, CACHE_CONFIG.HISTORICAL.ttl)
  },

  // Get global market data
  async getGlobalData(): Promise<GlobalMarketData> {
    const cacheKey = CACHE_CONFIG.GLOBAL.key
    const url = `${BASE_URL}/global`

    return fetchWithCache<GlobalMarketData>(url, cacheKey, CACHE_CONFIG.GLOBAL.ttl)
  },

  // Get trending coins
  async getTrending(): Promise<TrendingData> {
    const cacheKey = CACHE_CONFIG.TRENDING.key
    const url = `${BASE_URL}/search/trending`

    return fetchWithCache<TrendingData>(url, cacheKey, CACHE_CONFIG.TRENDING.ttl)
  },

  // Get list of all coins
  async getCoinsList(): Promise<{ id: string; symbol: string; name: string }[]> {
    const cacheKey = CACHE_CONFIG.COIN_LIST.key
    const url = `${BASE_URL}/coins/list`

    return fetchWithCache<{ id: string; symbol: string; name: string }[]>(url, cacheKey, CACHE_CONFIG.COIN_LIST.ttl)
  },
}
