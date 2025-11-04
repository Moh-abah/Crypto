// Utility functions for formatting cryptocurrency data

export function formatCurrency(value: number, abbreviated = false): string {
  if (abbreviated) {
    return formatMarketCap(value)
  }
  return formatPrice(value)
}

export function formatPrice(price: number): string {
  if (price === 0) return "$0.00"

  if (price < 0.01) {
    return `$${price.toFixed(6)}`
  } else if (price < 1) {
    return `$${price.toFixed(4)}`
  } else if (price < 100) {
    return `$${price.toFixed(2)}`
  } else {
    return `$${price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }
}

export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1_000_000_000_000) {
    return `$${(marketCap / 1_000_000_000_000).toFixed(2)}T`
  } else if (marketCap >= 1_000_000_000) {
    return `$${(marketCap / 1_000_000_000).toFixed(2)}B`
  } else if (marketCap >= 1_000_000) {
    return `$${(marketCap / 1_000_000).toFixed(2)}M`
  } else if (marketCap >= 1_000) {
    return `$${(marketCap / 1_000).toFixed(2)}K`
  } else {
    return `$${marketCap.toFixed(2)}`
  }
}

export function formatVolume(volume: number): string {
  return formatMarketCap(volume)
}

export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? "+" : ""
  return `${sign}${percentage.toFixed(2)}%`
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000_000_000) {
    return `${(num / 1_000_000_000_000).toFixed(2)}T`
  } else if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`
  } else {
    return num.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getPercentageColor(percentage: number): string {
  return percentage >= 0 ? "text-success" : "text-danger"
}

export function getPercentageColorClass(percentage: number): string {
  return percentage >= 0 ? "text-green-500" : "text-red-500"
}
