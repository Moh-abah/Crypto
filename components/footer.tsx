import Link from "next/link"
import { TrendingUp } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                CryptoPriceTracker
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Track cryptocurrency prices in real-time with accurate data and powerful analytics.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Markets</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/markets" className="hover:text-primary transition-colors">
                  Market Overview
                </Link>
              </li>
              <li>
                <Link href="/trending" className="hover:text-primary transition-colors">
                  Trending Coins
                </Link>
              </li>
              <li>
                <Link href="/top-cryptocurrencies" className="hover:text-primary transition-colors">
                  Top Cryptocurrencies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/converter" className="hover:text-primary transition-colors">
                  Currency Converter
                </Link>
              </li>
              <li>
                <Link href="/bitcoin" className="hover:text-primary transition-colors">
                  Bitcoin Price
                </Link>
              </li>
              <li>
                <Link href="/ethereum" className="hover:text-primary transition-colors">
                  Ethereum Price
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {/* <li>
                <Link href="/news" className="hover:text-primary transition-colors">
                  Crypto News
                </Link>
              </li> */}
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CryptoPriceTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
