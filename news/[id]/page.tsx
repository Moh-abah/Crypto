// import { notFound } from 'next/navigation'
// import { cryptoNewsAPI } from '@/lib/api/cryptoNews'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//     ExternalLink,
//     Calendar,
//     ArrowUp,
//     ArrowDown,
//     Share2,
//     ThumbsUp,
//     ThumbsDown,
//     Star,
//     Clock,
//     ArrowLeft,
//     Play,
//     Image as ImageIcon,
//     TrendingUp,
//     AlertTriangle,
//     DollarSign,
//     BarChart3,
//     Users,
//     Eye,
//     MessageCircle,
//     Bookmark,
//     Zap
// } from "lucide-react"
// import Link from 'next/link'
// import MediaSectiossss from '../media-section'

// interface PageProps {
//     params: Promise<{ id: string }>
// }

// export async function generateMetadata({ params }: PageProps) {
//     const { id } = await params

//     try {
//         const article = await cryptoNewsAPI.getArticleById(id)

//         if (!article) {
//             return {
//                 title: 'Article Not Found - CryptoInsider',
//                 description: 'The requested article was not found.'
//             }
//         }

//         return {
//             title: `${article.title} | CryptoInsider`,
//             description: article.description || article.title,
//             openGraph: {
//                 title: article.title,
//                 description: article.description || `Latest crypto news and analysis from CryptoInsider`,
//                 type: 'article',
//                 publishedTime: article.published_at,
//             },
//             twitter: {
//                 card: 'summary_large_image',
//                 title: article.title,
//                 description: article.description || 'Latest cryptocurrency news and market analysis'
//             }
//         }
//     } catch (error) {
//         return {
//             title: 'Article - CryptoInsider',
//             description: 'Cryptocurrency news and market analysis'
//         }
//     }
// }

// function ShareButtons({ article }: { article: any }) {
//     const shareText = encodeURIComponent(`🚀 ${article.title} - Read more on CryptoInsider`)
//     const shareUrl = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')

//     return (
//         <div className="flex flex-wrap gap-3">
//             <Button
//                 variant="outline"
//                 size="sm"
//                 className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 shadow-md"
//                 asChild
//             >
//                 <a
//                     href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     <Share2 className="h-4 w-4 mr-2" />
//                     Share on Twitter
//                 </a>
//             </Button>
//             <Button
//                 variant="outline"
//                 size="sm"
//                 className="bg-gray-800 text-white border-gray-800 hover:bg-gray-900 hover:border-gray-900 transition-all duration-300 shadow-md"
//                 asChild
//             >
//                 <a
//                     href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     <Share2 className="h-4 w-4 mr-2" />
//                     Share on LinkedIn
//                 </a>
//             </Button>
//             <Button
//                 variant="outline"
//                 size="sm"
//                 className="bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 transition-all duration-300 shadow-md"
//                 asChild
//             >
//                 <a
//                     href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     <Share2 className="h-4 w-4 mr-2" />
//                     Share on WhatsApp
//                 </a>
//             </Button>
//         </div>
//     )
// }

// function SentimentMeter({ votes, sentiment }: { votes: any, sentiment: string }) {
//     const totalVotes = votes?.positive + votes?.negative
//     const positivePercentage = totalVotes > 0 ? (votes.positive / totalVotes) * 100 : 0

//     return (
//         <div className="space-y-6">
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
//                     <ThumbsUp className="h-6 w-6" />
//                     <span>{votes?.positive} ({Math.round(positivePercentage)}%)</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
//                     <ThumbsDown className="h-6 w-6" />
//                     <span>{votes?.negative} ({Math.round(100 - positivePercentage)}%)</span>
//                 </div>
//             </div>

//             <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
//                 <div
//                     className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
//                     style={{ width: `${positivePercentage}%` }}
//                 />
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
//                     <Star className="h-5 w-5 mx-auto mb-1 text-yellow-600" fill="currentColor" />
//                     <div className="font-bold text-gray-900">{votes?.important}</div>
//                     <div className="text-xs text-gray-600">Important</div>
//                 </div>
//                 <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
//                     <MessageCircle className="h-5 w-5 mx-auto mb-1 text-purple-600" />
//                     <div className="font-bold text-gray-900">{votes?.comments}</div>
//                     <div className="text-xs text-gray-600">Comments</div>
//                 </div>
//                 <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
//                     <Bookmark className="h-5 w-5 mx-auto mb-1 text-green-600" />
//                     <div className="font-bold text-gray-900">{votes?.saved}</div>
//                     <div className="text-xs text-gray-600">Saved</div>
//                 </div>
//                 <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
//                     <Zap className="h-5 w-5 mx-auto mb-1 text-orange-600" />
//                     <div className="font-bold text-gray-900">{votes?.liked}</div>
//                     <div className="text-xs text-gray-600">Likes</div>
//                 </div>
//             </div>

//             {sentiment && (
//                 <div className={`text-center p-4 rounded-xl border-2 ${sentiment === 'bullish'
//                         ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
//                         : sentiment === 'bearish'
//                             ? 'bg-gradient-to-r from-red-50 to-rose-50 border-red-300'
//                             : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-300'
//                     }`}>
//                     <div className="font-bold text-lg text-gray-900 mb-1">
//                         Market Sentiment: <span className={
//                             sentiment === 'bullish'
//                                 ? 'text-green-600'
//                                 : sentiment === 'bearish'
//                                     ? 'text-red-600'
//                                     : 'text-blue-600'
//                         }>{sentiment.toUpperCase()}</span>
//                     </div>
//                     <div className="text-sm text-gray-600">
//                         {sentiment === 'bullish'
//                             ? 'Positive market outlook based on community analysis'
//                             : sentiment === 'bearish'
//                                 ? 'Caution advised based on market indicators'
//                                 : 'Neutral market sentiment observed'
//                         }
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// function CurrencyDetails({ currency }: { currency: any }) {
//     return (
//         <div className="p-4 bg-gradient-to-br from-white to-blue-50 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
//             <div className="flex items-center justify-between mb-3">
//                 <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                         {currency.code}
//                     </div>
//                     <div>
//                         <h4 className="font-bold text-gray-900">{currency.title}</h4>
//                         <p className="text-sm text-gray-600">Rank #{currency.market_rank}</p>
//                     </div>
//                 </div>
//                 <Badge className={
//                     currency.market_rank <= 10
//                         ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
//                         : currency.market_rank <= 50
//                             ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
//                             : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
//                 }>
//                     #{currency.market_rank}
//                 </Badge>
//             </div>

//             <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div className="space-y-1">
//                     <div className="flex items-center gap-1 text-gray-600">
//                         <DollarSign className="h-3 w-3" />
//                         <span>Price:</span>
//                     </div>
//                     <div className="font-bold text-gray-900">
//                         ${currency.price_in_usd?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
//                     </div>
//                 </div>
//                 <div className="space-y-1">
//                     <div className="flex items-center gap-1 text-gray-600">
//                         <BarChart3 className="h-3 w-3" />
//                         <span>Market Cap:</span>
//                     </div>
//                     <div className="font-bold text-gray-900">
//                         ${(currency.market_cap_usd / 1000000000).toFixed(2)}B
//                     </div>
//                 </div>
//             </div>

//             {currency.price_in_btc > 0 && (
//                 <div className="mt-3 p-2 bg-gray-50 rounded-lg text-xs text-gray-600">
//                     <div className="flex justify-between">
//                         <span>BTC Value:</span>
//                         <span className="font-mono">{currency.price_in_btc.toFixed(8)} BTC</span>
//                     </div>
//                     {currency.price_in_eth > 0 && (
//                         <div className="flex justify-between mt-1">
//                             <span>ETH Value:</span>
//                             <span className="font-mono">{currency.price_in_eth.toFixed(6)} ETH</span>
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     )
// }

// function RelatedCurrencies({ currencies }: { currencies: any[] }) {
//     if (!currencies || currencies.length === 0) {
//         return null
//     }

//     return (
//         <div className="space-y-6">
//             <div className="flex items-center gap-3">
//                 <TrendingUp className="h-6 w-6 text-blue-600" />
//                 <h3 className="font-bold text-2xl text-gray-900">Featured Cryptocurrencies</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {currencies.map((currency) => (
//                     <CurrencyDetails key={currency.code} currency={currency} />
//                 ))}
//             </div>

//             <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
//                 <div className="flex items-center gap-2 text-sm text-blue-700">
//                     <AlertTriangle className="h-4 w-4" />
//                     <span className="font-medium">Analysis provided by CryptoInsider Market Intelligence</span>
//                 </div>
//             </div>
//         </div>
//     )
// }

// function ArticleMeta({ article }: { article: any }) {
//     const publishedDate = new Date(article.published_at)
//     const now = new Date()
//     const diffTime = Math.abs(now.getTime() - publishedDate.getTime())
//     const diffHours = Math.ceil(diffTime / (1000 * 60 * 60))

//     let timeAgo = ''
//     if (diffHours < 1) {
//         timeAgo = 'Just now'
//     } else if (diffHours < 24) {
//         timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
//     } else {
//         timeAgo = `${Math.floor(diffHours / 24)} day${Math.floor(diffHours / 24) > 1 ? 's' : ''} ago`
//     }

//     return (
//         <div className="flex flex-wrap items-center gap-4 text-sm">
//             {/* موقعنا كمصدر رئيسي */}
//             <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
//                 🚀 CryptoInsider Exclusive
//             </span>

//             <span className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-blue-200">
//                 <Calendar className="h-4 w-4 text-blue-600" />
//                 {publishedDate.toLocaleDateString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric'
//                 })}
//             </span>

//             <span className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-green-200">
//                 <Clock className="h-4 w-4 text-green-600" />
//                 {timeAgo}
//             </span>

//             {article.sentiment && (
//                 <Badge className={`
//                     px-4 py-2 text-sm font-bold border-0 shadow-lg
//                     ${article.sentiment === 'bullish'
//                         ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
//                         : article.sentiment === 'bearish'
//                             ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
//                             : 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
//                     }
//                 `}>
//                     {article.sentiment === 'bullish' ? (
//                         <ArrowUp className="h-4 w-4 mr-1" />
//                     ) : article.sentiment === 'bearish' ? (
//                         <ArrowDown className="h-4 w-4 mr-1" />
//                     ) : null}
//                     {article.sentiment.toUpperCase()} MARKET
//                 </Badge>
//             )}

//             {article.panic_score && (
//                 <Badge className={`
//                     px-4 py-2 text-sm font-bold border-0 shadow-lg
//                     ${article.panic_score > 70
//                         ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white'
//                         : article.panic_score > 30
//                             ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white'
//                             : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
//                     }
//                 `}>
//                     <AlertTriangle className="h-4 w-4 mr-1" />
//                     PANIC: {article.panic_score}/100
//                 </Badge>
//             )}
//         </div>
//     )
// }

// function MarketInsights({ article }: { article: any }) {
//     if (!article.currencies || article.currencies.length === 0) {
//         return null
//     }

//     // بدل الكود الحالي من السطر 373
//     const currenciesArray = Array.isArray(article.currencies) ? article.currencies : [];
//     const totalMarketCap = currenciesArray.reduce((sum: number, curr: any) => sum + (curr.market_cap_usd || 0), 0);
//     const avgMarketRank = currenciesArray.length > 0
//         ? currenciesArray.reduce((sum: number, curr: any) => sum + (curr.market_rank || 0), 0) / currenciesArray.length
//         : 0;
//     return (
//         <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 shadow-lg">
//             <CardHeader className="pb-4">
//                 <CardTitle className="flex items-center gap-2 text-gray-900">
//                     <BarChart3 className="h-6 w-6 text-blue-600" />
//                     Market Insights
//                 </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="text-center p-3 bg-white rounded-lg border border-blue-200 shadow-sm">
//                         <div className="font-bold text-2xl text-blue-600">{article.currencies.length}</div>
//                         <div className="text-xs text-gray-600">Currencies</div>
//                     </div>
//                     <div className="text-center p-3 bg-white rounded-lg border border-green-200 shadow-sm">
//                         <div className="font-bold text-2xl text-green-600">
//                             ${(totalMarketCap / 1000000000).toFixed(1)}B
//                         </div>
//                         <div className="text-xs text-gray-600">Total Market Cap</div>
//                     </div>
//                     <div className="text-center p-3 bg-white rounded-lg border border-purple-200 shadow-sm">
//                         <div className="font-bold text-2xl text-purple-600">{Math.round(avgMarketRank)}</div>
//                         <div className="text-xs text-gray-600">Avg Rank</div>
//                     </div>
//                     <div className="text-center p-3 bg-white rounded-lg border border-orange-200 shadow-sm">
//                         <div className="font-bold text-2xl text-orange-600">{article.panic_score || 'N/A'}</div>
//                         <div className="text-xs text-gray-600">Panic Score</div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg p-4 border border-blue-200">
//                     <div className="flex items-center justify-between text-sm">
//                         <span className="font-medium text-gray-700">Market Analysis:</span>
//                         <span className={`font-bold ${article.sentiment === 'bullish'
//                                 ? 'text-green-600'
//                                 : article.sentiment === 'bearish'
//                                     ? 'text-red-600'
//                                     : 'text-blue-600'
//                             }`}>
//                             {article.sentiment?.toUpperCase() || 'NEUTRAL'}
//                         </span>
//                     </div>
//                     <div className="mt-2 text-xs text-gray-600">
//                         Real-time market data and sentiment analysis provided by CryptoInsider
//                     </div>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }

// function ArticleContent({ article }: { article: any }) {
//     if (article.description && article.description.length > 50) {
//         return (
//             <div className="space-y-6">
//                 <div className="prose prose-lg max-w-none bg-white p-8 rounded-2xl border shadow-sm">
//                     <div
//                         className="article-content"
//                         dangerouslySetInnerHTML={{
//                             __html: article.content.clean.length > 50000
//                                 ? article.content
//                                 : `<p class="text-gray-700 leading-relaxed">${article.content.clean}</p>`
//                         }}
//                     />
//                 </div>

//                 {/* إضافة دعوة للتفاعل */}
//                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 text-center">
//                     <h3 className="font-bold text-xl text-gray-900 mb-2">Want More Insights?</h3>
//                     <p className="text-gray-600 mb-4">
//                         Get real-time market analysis and exclusive content from CryptoInsider
//                     </p>
//                     <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
//                         Explore More Analysis
//                     </Button>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="text-center py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
//             <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
//                 <ExternalLink className="h-10 w-10 text-white" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Enhanced Analysis Available</h3>
//             <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg">
//                 CryptoInsider provides comprehensive market analysis, sentiment tracking, and real-time cryptocurrency data.
//                 For the complete story with enhanced insights, visit our detailed analysis platform.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button
//                     asChild
//                     size="lg"
//                     className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-xl font-bold"
//                 >
//                     <a
//                         href={article.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center gap-2"
//                     >
//                         <ExternalLink className="h-5 w-5" />
//                         View Detailed Analysis
//                     </a>
//                 </Button>
//                 <Button
//                     variant="outline"
//                     size="lg"
//                     className="border-blue-300 text-blue-600 hover:bg-blue-50 transition-all duration-300 px-8 py-3 rounded-xl font-bold"
//                 >
//                     <TrendingUp className="h-5 w-5 mr-2" />
//                     More Crypto Insights
//                 </Button>
//             </div>
//         </div>
//     )
// }

// export default async function NewsArticlePage({ params }: PageProps) {
//     const { id } = await params

//     try {
//         const article = await cryptoNewsAPI.getArticleById(id)

//         if (!article) {
//             notFound()
//         }

//         // جلب أخبار ذات صلة
//         const allNews = await cryptoNewsAPI.getAllNews()
//         const relatedNews = allNews
//             .filter(a => a.id !== article.id)
//             .slice(0, 6)

//         return (
//             <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//                 <div className="container mx-auto px-4 py-8 max-w-7xl">
//                     {/* شريط التنقل */}
//                     <nav className="mb-8">
//                         <Link
//                             href="/news"
//                             className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-all duration-300 bg-white px-4 py-3 rounded-xl shadow-sm border border-blue-200 hover:shadow-md hover:border-blue-300 font-semibold"
//                         >
//                             <ArrowLeft className="h-5 w-5" />
//                             Back to Crypto Insights
//                         </Link>
//                     </nav>

//                     <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//                         {/* المحتوى الرئيسي */}
//                         <div className="lg:col-span-3 space-y-8">
//                             <Card className="shadow-2xl border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
//                                 <CardHeader className="pb-6 bg-gradient-to-r from-white to-blue-50/70 border-b border-blue-200">
//                                     <ArticleMeta article={article} />

//                                     <CardTitle className="text-4xl lg:text-5xl leading-tight mt-6 font-bold bg-gradient-to-br from-gray-900 to-blue-900 bg-clip-text text-transparent">
//                                         {article.title}
//                                     </CardTitle>

//                                     {article.description && (
//                                         <p className="text-xl text-gray-700 leading-relaxed mt-4">
//                                             {article.description}
//                                         </p>
//                                     )}
//                                 </CardHeader>

//                                 <CardContent className="space-y-8 pt-8">
//                                     {/* الوسائط */}
//                                     <MediaSectiossss article={article} />

//                                     {/* رؤى السوق */}
//                                     <MarketInsights article={article} />

//                                     {/* محتوى المقال */}
//                                     <div className="border-0 rounded-2xl overflow-hidden bg-white shadow-lg">
//                                         <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white px-8 py-4">
//                                             <h2 className="text-2xl font-bold flex items-center gap-2">
//                                                 <TrendingUp className="h-6 w-6" />
//                                                 CryptoInsider Analysis
//                                             </h2>
//                                         </div>
//                                         <div className="p-8">
//                                             <ArticleContent article={article} />
//                                         </div>
//                                     </div>

//                                     {/* تفاعل المجتمع */}
//                                     <div className="border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-lg">
//                                         <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4">
//                                             <h2 className="text-2xl font-bold flex items-center gap-2">
//                                                 <Users className="h-6 w-6" />
//                                                 Community Sentiment
//                                             </h2>
//                                         </div>
//                                         <div className="p-8">
//                                             <SentimentMeter votes={article.votes} sentiment={article.sentiment} />
//                                         </div>
//                                     </div>

//                                     {/* العملات المرتبطة */}
//                                     {article.currencies && article.currencies.length > 0 && (
//                                         <div className="border-0 rounded-2xl overflow-hidden bg-white shadow-lg">
//                                             <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4">
//                                                 <h2 className="text-2xl font-bold flex items-center gap-2">
//                                                     <DollarSign className="h-6 w-6" />
//                                                     Market Analysis
//                                                 </h2>
//                                             </div>
//                                             <div className="p-8">
//                                                 <RelatedCurrencies currencies={article.currencies} />
//                                             </div>
//                                         </div>
//                                     )}

//                                     {/* مشاركة المقال */}
//                                     <div className="border-0 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 shadow-lg border border-blue-200">
//                                         <h3 className="font-bold text-2xl mb-6 text-gray-900 flex items-center gap-2">
//                                             <Share2 className="h-6 w-6" />
//                                             Share This Analysis
//                                         </h3>
//                                         <div className="space-y-4">
//                                             <p className="text-gray-600">
//                                                 Help others discover this market analysis from CryptoInsider
//                                             </p>
//                                             <ShareButtons article={article} />
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </div>

//                         {/* الشريط الجانبي */}
//                         <div className="lg:col-span-1">
//                             <div className="space-y-8 sticky top-8">
//                                 {/* أخبار ذات صلة */}
//                                 {relatedNews.length > 0 && (
//                                     <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
//                                         <CardHeader className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-t-lg">
//                                             <CardTitle className="text-lg font-bold flex items-center gap-2">
//                                                 <Zap className="h-5 w-5" />
//                                                 Related Insights
//                                             </CardTitle>
//                                         </CardHeader>
//                                         <CardContent className="space-y-4 pt-6">
//                                             {relatedNews.map((related) => (
//                                                 <Link
//                                                     key={related.id}
//                                                     href={`/news/${related.id}`}
//                                                     className="block p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-white transition-all duration-300 shadow-sm hover:shadow-md group"
//                                                 >
//                                                     <p className="font-semibold text-sm line-clamp-2 mb-3 text-gray-900 group-hover:text-blue-700 transition-colors">
//                                                         {related.title}
//                                                     </p>
//                                                     <div className="flex items-center justify-between text-xs text-gray-500">
//                                                         <span className="bg-gradient-to-r from-blue-100 to-indigo-100 px-2 py-1 rounded group-hover:bg-blue-200 transition-colors text-blue-700 font-medium">
//                                                             CryptoInsider
//                                                         </span>
//                                                         <span className="text-gray-400">
//                                                             {new Date(related.published_at).toLocaleDateString()}
//                                                         </span>
//                                                     </div>
//                                                 </Link>
//                                             ))}
//                                         </CardContent>
//                                     </Card>
//                                 )}

//                                 {/* معلومات المقال */}
//                                 <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/70 backdrop-blur-sm">
//                                     <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
//                                         <CardTitle className="text-lg font-bold">Analysis Details</CardTitle>
//                                     </CardHeader>
//                                     <CardContent className="space-y-4 pt-6">
//                                         <div className="flex justify-between items-center py-2 border-b border-gray-200">
//                                             <span className="text-gray-600 font-medium">Published:</span>
//                                             <span className="font-semibold text-gray-900">
//                                                 {new Date(article.published_at).toLocaleDateString()}
//                                             </span>
//                                         </div>
//                                         <div className="flex justify-between items-center py-2 border-b border-gray-200">
//                                             <span className="text-gray-600 font-medium">Source:</span>
//                                             <span className="font-semibold text-blue-600">CryptoInsider</span>
//                                         </div>
//                                         <div className="flex justify-between items-center py-2 border-b border-gray-200">
//                                             <span className="text-gray-600 font-medium">Market Sentiment:</span>
//                                             <span className={`font-semibold capitalize px-2 py-1 rounded ${article.sentiment === 'bullish'
//                                                     ? 'bg-green-100 text-green-700'
//                                                     : article.sentiment === 'bearish'
//                                                         ? 'bg-red-100 text-red-700'
//                                                         : 'bg-blue-100 text-blue-700'
//                                                 }`}>
//                                                 {article.sentiment || 'neutral'}
//                                             </span>
//                                         </div>
//                                         {article.currencies && article.currencies.length > 0 && (
//                                             <div className="flex justify-between items-center py-2 border-b border-gray-200">
//                                                 <span className="text-gray-600 font-medium">Currencies:</span>
//                                                 <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
//                                                     {article.currencies.length}
//                                                 </span>
//                                             </div>
//                                         )}
//                                         {article.panic_score && (
//                                             <div className="flex justify-between items-center py-2">
//                                                 <span className="text-gray-600 font-medium">Market Panic:</span>
//                                                 <span className={`font-bold px-2 py-1 rounded ${article.panic_score > 70
//                                                         ? 'bg-red-100 text-red-700'
//                                                         : article.panic_score > 30
//                                                             ? 'bg-yellow-100 text-yellow-700'
//                                                             : 'bg-green-100 text-green-700'
//                                                     }`}>
//                                                     {article.panic_score}/100
//                                                 </span>
//                                             </div>
//                                         )}
//                                     </CardContent>
//                                 </Card>

//                                 {/* دعوة للتفاعل */}
//                                 <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
//                                     <CardContent className="p-6 text-center">
//                                         <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                                             <TrendingUp className="h-6 w-6 text-white" />
//                                         </div>
//                                         <h4 className="font-bold text-gray-900 mb-2">Stay Informed</h4>
//                                         <p className="text-sm text-gray-600 mb-4">
//                                             Get real-time crypto insights and market analysis
//                                         </p>
//                                         <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg">
//                                             Subscribe to Updates
//                                         </Button>
//                                     </CardContent>
//                                 </Card>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     } catch (error) {
//         console.error('Error loading article:', error)
//         notFound()
//     }
// }