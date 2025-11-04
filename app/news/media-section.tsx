// // components/news/media-section.tsx
// "use client"

// import React from "react"
// import type { NewsArticle } from "@/lib/api/cryptoNews"
// import {
//     Calendar,
//     Clock,
//     Eye,
//     Share2,
//     ThumbsUp,
//     ThumbsDown,
//     Star,
//     MessageCircle,
//     Bookmark,
//     AlertTriangle,
//     TrendingUp,
//     ExternalLink
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"

// interface MediaSectiossssProps {
//     article: NewsArticle
// }

// export default function MediaSectiossss({ article }: MediaSectiossssProps) {
//     const onImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//         e.currentTarget.src = "/placeholder.svg?height=400&width=800"
//         e.currentTarget.className = "w-full h-64 object-cover rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center"
//     }

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

//     const totalVotes = (article.votes?.positive || 0) + (article.votes?.negative || 0)
//     const positivePercentage = totalVotes > 0 ? ((article.votes?.positive || 0) / totalVotes) * 100 : 0

//     const handleShare = async () => {
//         if (navigator.share) {
//             try {
//                 await navigator.share({
//                     title: article.title,
//                     text: article.description,
//                     url: window.location.href,
//                 })
//             } catch (err) {
//                 console.log('Error sharing:', err)
//             }
//         } else {
//             // Fallback for browsers that don't support Web Share API
//             navigator.clipboard.writeText(window.location.href)
//             alert('Link copied to clipboard!')
//         }
//     }

//     return (
//         <div className="space-y-6">
//             {/* صورة المقال الرئيسية */}
//             <div className="relative group">
//                 <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100">
//                     {article.image_url ? (
//                         <img
//                             src={article.image_url}
//                             alt={article.title}
//                             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                             onError={onImgError}
//                         />
//                     ) : (
//                         <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-8">
//                             <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full flex items-center justify-center mb-4">
//                                 <Eye className="h-8 w-8 text-blue-600" />
//                             </div>
//                             <p className="text-lg font-semibold text-gray-600 text-center">
//                                 CryptoInsider Market Analysis
//                             </p>
//                             <p className="text-sm text-gray-500 text-center mt-2">
//                                 Comprehensive cryptocurrency insights and data
//                             </p>
//                         </div>
//                     )}

//                     {/* Overlay Gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                     {/* Badges على الصورة */}
//                     <div className="absolute top-4 left-4 flex flex-wrap gap-2">
//                         <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
//                             🚀 CryptoInsider
//                         </Badge>
//                         {article.sentiment && (
//                             <Badge className={`
//                                 border-0 shadow-lg text-white font-bold
//                                 ${article.sentiment === 'bullish'
//                                     ? 'bg-gradient-to-r from-green-500 to-emerald-600'
//                                     : article.sentiment === 'bearish'
//                                         ? 'bg-gradient-to-r from-red-500 to-rose-600'
//                                         : 'bg-gradient-to-r from-blue-500 to-cyan-600'
//                                 }
//                             `}>
//                                 {article.sentiment.toUpperCase()}
//                             </Badge>
//                         )}
//                     </div>
//                 </div>

//                 {/* Social Actions Bar */}
//                 <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <Button
//                         size="sm"
//                         className="bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border-0 shadow-lg"
//                         onClick={handleShare}
//                     >
//                         <Share2 className="h-4 w-4 mr-1" />
//                         Share
//                     </Button>
//                 </div>
//             </div>

//             {/* معلومات المقال والتفاعلات */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* معلومات المصدر والوقت */}
//                 <div className="lg:col-span-2">
//                     <div className="flex flex-wrap items-center gap-4">
//                         <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm border border-blue-200">
//                             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
//                                 <span className="text-white text-sm font-bold">CI</span>
//                             </div>
//                             <div>
//                                 <p className="font-semibold text-gray-900">CryptoInsider</p>
//                                 <p className="text-xs text-gray-500">Market Intelligence</p>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-blue-200">
//                             <Calendar className="h-4 w-4 text-blue-600" />
//                             <span className="text-sm text-gray-700">
//                                 {publishedDate.toLocaleDateString('en-US', {
//                                     year: 'numeric',
//                                     month: 'short',
//                                     day: 'numeric'
//                                 })}
//                             </span>
//                         </div>

//                         <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-green-200">
//                             <Clock className="h-4 w-4 text-green-600" />
//                             <span className="text-sm text-gray-700">{timeAgo}</span>
//                         </div>

//                         {article.author && (
//                             <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-purple-200">
//                                 <span className="text-sm text-gray-700">By {article.author}</span>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* إحصائيات التفاعل */}
//                 <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
//                     {/* مؤشر المشاعر */}
//                     {article.sentiment && (
//                         <div className={`px-3 py-2 rounded-lg text-sm font-bold ${article.sentiment === 'bullish'
//                                 ? 'bg-green-100 text-green-700 border border-green-300'
//                                 : article.sentiment === 'bearish'
//                                     ? 'bg-red-100 text-red-700 border border-red-300'
//                                     : 'bg-blue-100 text-blue-700 border border-blue-300'
//                             }`}>
//                             {article.sentiment === 'bullish' ? '📈 Bullish' :
//                                 article.sentiment === 'bearish' ? '📉 Bearish' : '⚡ Neutral'}
//                         </div>
//                     )}

//                     {/* مؤشر الذعر */}
//                     {article.panic_score && (
//                         <div className={`px-3 py-2 rounded-lg text-sm font-bold ${article.panic_score > 70
//                                 ? 'bg-red-100 text-red-700 border border-red-300'
//                                 : article.panic_score > 30
//                                     ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
//                                     : 'bg-green-100 text-green-700 border border-green-300'
//                             }`}>
//                             <AlertTriangle className="h-3 w-3 inline mr-1" />
//                             Panic: {article.panic_score}
//                         </div>
//                     )}
//                 </div>
//             </div>

        
//         </div>
//     )
// }