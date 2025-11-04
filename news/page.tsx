// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Newspaper, ExternalLink, TrendingUp, TrendingDown, Flame } from "lucide-react"
// import type { Metadata } from "next"
// import { cryptoNewsAPI } from "@/lib/api/cryptoNews"
// import Link from "next/link"

// export const metadata: Metadata = {
//   title: "Cryptocurrency News | Latest Crypto & Blockchain Updates",
//   description:
//     "Stay updated with the latest cryptocurrency news, blockchain developments, and market insights from trusted sources.",
//   keywords: "cryptocurrency news, crypto news, blockchain news, bitcoin news, ethereum news",
// }

// export const revalidate = 600 // Revalidate every 10 minutes

// function getNewsIcon(kind: string) {
//   switch (kind) {
//     case "news":
//       return <Newspaper className="h-5 w-5" />
//     case "media":
//       return <Flame className="h-5 w-5" />
//     default:
//       return <Newspaper className="h-5 w-5" />
//   }
// }

// function formatDate(dateString: string) {
//   const date = new Date(dateString)
//   const now = new Date()
//   const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

//   if (diffInHours < 1) {
//     const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
//     return `${diffInMinutes}m ago`
//   } else if (diffInHours < 24) {
//     return `${diffInHours}h ago`
//   } else {
//     const diffInDays = Math.floor(diffInHours / 24)
//     return `${diffInDays}d ago`
//   }
// }

// export default async function NewsPage() {
//   let newsArticles: any[] = []
//   let error = null

//   try {
//     newsArticles = await cryptoNewsAPI.getHotNews()
//   } catch (err) {
//     error = "Failed to load news. Please try again later."
//     console.error(err)
//   }

//   return (
//     <div className="container mx-auto px-4 py-12 space-y-8">
//       <div className="space-y-2">
//         <div className="flex items-center gap-3">
//           <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
//             <Newspaper className="h-6 w-6 text-primary" />
//           </div>
//           <div>
//             <h1 className="text-4xl font-bold tracking-tight">Cryptocurrency News</h1>
//             <p className="text-muted-foreground text-lg">Latest updates from the crypto world</p>
//           </div>
//         </div>
//       </div>

//       {error ? (
//         <Card className="border-destructive/50">
//           <CardContent className="pt-6">
//             <p className="text-destructive">{error}</p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {newsArticles.map((article) => (
//             <Link key={article.id} href={`/news/${article.id}`}>
//               <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
//                 <CardHeader>
//                   <div className="flex items-start justify-between mb-2 gap-2">
//                     <div className="flex flex-wrap gap-1">
                    
//                       {article.currencies && Array.isArray(article.currencies) ? (
//                         article.currencies.slice(0, 2).map((currency) => (
//                           <Badge key={currency.code} variant="secondary" className="text-xs">
//                             {currency.code}
//                           </Badge>
//                         ))
//                       ) : (
//                         <Badge variant="secondary" className="text-xs">
//                           Crypto
//                         </Badge>
//                       )}
//                     </div>
//                     <span className="text-xs text-muted-foreground whitespace-nowrap">
//                       {formatDate(article.published_at)}
//                     </span>
//                   </div>
//                   <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
//                     {article.title}
//                   </CardTitle>
//                   <CardDescription className="line-clamp-2">{article.source.title}</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3 text-sm text-muted-foreground">
//                       {article.votes?.positive > 0 && (
//                         <div className="flex items-center gap-1">
//                           <TrendingUp className="h-4 w-4 text-green-500" />
//                           <span>{article.votes.positive}</span>
//                         </div>
//                       )}
//                       {article.votes?.negative > 0 && (
//                         <div className="flex items-center gap-1">
//                           <TrendingDown className="h-4 w-4 text-red-500" />
//                           <span>{article.votes?.negative}</span>
//                         </div>
//                       )}
//                     </div>
//                     <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }
