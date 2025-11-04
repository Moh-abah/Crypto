// Cache configuration with different TTLs for different data types

export const CACHE_CONFIG = {
  // Live prices - 5 minutes (increased from 30 seconds)
  LIVE_PRICES: { ttl: 300, key: "live-prices" },

  // Basic coin data - 30 minutes (increased from 5 minutes)
  COIN_BASIC: { ttl: 1800, key: "coin-basic" },

  // Detailed coin data - 2 hours (increased from 30 minutes)
  COIN_DETAIL: { ttl: 7200, key: "coin-detail" },

  // Historical data - 24 hours (unchanged)
  HISTORICAL: { ttl: 86400, key: "historical" },

  // Global market data - 30 minutes (increased from 10 minutes)
  GLOBAL: { ttl: 1800, key: "global" },

  // Trending coins - 1 hour (increased from 15 minutes)
  TRENDING: { ttl: 3600, key: "trending" },

  // Coin list - 24 hours (unchanged)
  COIN_LIST: { ttl: 86400, key: "coin-list" },
} as const

export type CacheKey = keyof typeof CACHE_CONFIG
