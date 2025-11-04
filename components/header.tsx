import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/markets", label: "Markets" },
    { href: "/trending", label: "Trending" },
    { href: "/top-cryptocurrencies", label: "Top Cryptos" },
    { href: "/converter", label: "Converter" },
    { href: "/market-map", label: "Market Map" },
    // { href: "/news", label: "News" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="hidden sm:inline-block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            CryptoPriceTracker
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
