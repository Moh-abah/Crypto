// Core TypeScript types for cryptocurrency data

export interface CoinMarket {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  last_updated: string
  sparkline_in_7d?: {
    price: number[]
  }
  price_change_percentage_7d_in_currency?: number
}

export interface CoinDetail {
  links: any
  id: string
  symbol: string
  name: string
  description: {
    en: string
  }
  image: {
    thumb: string
    small: string
    large: string
  }
  market_cap_rank: number
  market_data: {
    current_price: {
      usd: number
    }
    market_cap: {
      usd: number
    }
    total_volume: {
      usd: number
    }
    high_24h: {
      usd: number
    }
    low_24h: {
      usd: number
    }
    price_change_24h: number
    price_change_percentage_24h: number
    price_change_percentage_7d: number
    price_change_percentage_30d: number
    price_change_percentage_1y: number
    market_cap_change_24h: number
    market_cap_change_percentage_24h: number
    circulating_supply: number
    total_supply: number | null
    max_supply: number | null
    ath: {
      usd: number
    }
    ath_change_percentage: {
      usd: number
    }
    ath_date: {
      usd: string
    }
    atl: {
      usd: number
    }
    atl_change_percentage: {
      usd: number
    }
    atl_date: {
      usd: string
    }
  }
  last_updated: string
}

export interface CoinHistory {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

export interface GlobalMarketData {
  data: {
    active_cryptocurrencies: number
    markets: number
    total_market_cap: {
      usd: number
    }
    total_volume: {
      usd: number
    }
    market_cap_percentage: {
      btc: number
      eth: number
    }
    market_cap_change_percentage_24h_usd: number
    updated_at: number
  }
}

export interface TrendingCoin {
  item: {
    id: string
    coin_id: number
    name: string
    symbol: string
    market_cap_rank: number
    thumb: string
    small: string
    large: string
    slug: string
    price_btc: number
    score: number
  }
}

export interface TrendingData {
  coins: TrendingCoin[]
}

export interface ChartDataPoint {
  timestamp: number
  price: number
  volume?: number
  marketCap?: number
}

export type TimeRange = "24h" | "7d" | "30d" | "90d" | "1y" | "all"

export interface CacheConfig {
  ttl: number
  key: string
}
