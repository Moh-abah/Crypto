// // lib/api/cryptoNews.ts - النسخة المعدلة بدون بيانات وهمية
// import { memoryCache } from "@/lib/cache/memoryCache"
// import slugify from "slugify";
// // أضف هذا في بداية الملف بعد الـ imports
// // أضف هذا في بداية الملف
// const BINANCE_BASE_URL = 'https://api.binance.com/api/v3'
// const BINANCE_CACHE_TTL = 60 // 1 دقيقة فقط لأن الأسعار تتغير بسرعة
// const NEWS_CACHE_TTL = 600 // 10 دقائق

// export interface NewsArticle {
//   id: string
//   title: string
//   description: string
//   url: string
//   original_url: string
//   source: {
//     title: string;
//     domain: string;
//     region: string;
//     type: string;
//   }
//   published_at: string
//   created_at: string
//   kind: string
//   currencies: Array<{
//     code: string;
//     title: string;
//     slug: string;
//     market_cap_usd?: number;
//     price_in_usd?: number;
//     price_in_btc?: number;
//     price_in_eth?: number;
//     market_rank?: number;
//   }>
//   votes: {
//     positive: number;
//     negative: number;
//     important: number;
//     liked: number;
//     disliked: number;
//     lol: number;
//     toxic: number;
//     saved: number;
//     comments: number;
//   }
//   content?: {
//     original: string;
//     clean: string;
//   }
//   image_url?: string
//   author?: string
//   panic_score?: number
//   panic_score_1h?: number
//   sentiment?: 'bullish' | 'bearish' | 'neutral'
//   metadata?: any
// }

// // --- helpers ---
// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// // دالة لإنشاء IDs آمنة للـ URL
// export function generateSafeId(title: string, index?: number): string {
//   const slug = slugify(title, {
//     lower: true,
//     strict: true,
//     trim: true,
//   });
//   return index ? `${slug}-${index}` : slug;
// }

// // دالة لاستخراج معرف فريد من الرابط
// function extractUniqueIdFromUrl(url: string): string {
//   try {
//     const urlObj = new URL(url)
//     const path = urlObj.pathname.replace(/\//g, '-').replace(/^-|-$/g, '')
//     const search = urlObj.searchParams.toString()

//     if (search) {
//       return `${path}-${search}`
//     }
//     return path || 'article'
//   } catch {
//     return 'article'
//   }
// }

// async function retryFetch(url: string, options: any = {}, retries = 2, backoffMs = 1000): Promise<Response> {
//   try {
//     const resp = await fetch(url, options)
//     if (resp.status === 429 && retries > 0) {
//       const wait = backoffMs
//       console.warn(`[retryFetch] 429 - retrying after ${wait}ms for ${url}`)
//       await sleep(wait)
//       return retryFetch(url, options, retries - 1, backoffMs * 2)
//     }
//     if (resp.status >= 500 && resp.status < 600 && retries > 0) {
//       console.warn(`[retryFetch] ${resp.status} server error - retrying ${url}`)
//       await sleep(backoffMs)
//       return retryFetch(url, options, retries - 1, backoffMs * 2)
//     }
//     return resp
//   } catch (err) {
//     if (retries > 0) {
//       console.warn(`[retryFetch] network error, retrying ${url}:`, err)
//       await sleep(backoffMs)
//       return retryFetch(url, options, retries - 1, backoffMs * 2)
//     }
//     throw err
//   }
// }



// // دالة لجلب السعر الحقيقي من Binance
// async function fetchBinancePrice(symbol: string): Promise<{
//   price_in_usd: number;
//   price_in_btc?: number;
// } | null> {
//   const cacheKey = `binance-price-${symbol}`
//   const cached = memoryCache.get(cacheKey)
//   if (cached) return cached

//   try {
//     // جلب سعر USDT
//     const response = await retryFetch(
//       `${BINANCE_BASE_URL}/ticker/price?symbol=${symbol}USDT`,
//       { signal: AbortSignal.timeout(3000) }
//     )

//     if (response.ok) {
//       const data = await response.json()
//       const price = parseFloat(data.price)

//       const result = {
//         price_in_usd: price,
//         price_in_btc: undefined // Binance ما بيعطينا سعر بالبيتكوين مباشرة
//       }

//       memoryCache.set(cacheKey, result, BINANCE_CACHE_TTL)
//       return result
//     }
//   } catch (error) {
//     console.warn(`[Binance] Failed to fetch price for ${symbol}:`, error)
//   }

//   return null
// }

// // دالة مساعدة لجلب market cap تقديري (من حجم التداول)
// async function getEstimatedMarketCap(symbol: string, price: number): Promise<number> {
//   try {
//     const response = await retryFetch(
//       `${BINANCE_BASE_URL}/ticker/24hr?symbol=${symbol}USDT`,
//       { signal: AbortSignal.timeout(3000) }
//     )

//     if (response.ok) {
//       const data = await response.json()
//       const volume = parseFloat(data.volume) * price // حجم التداول بالدولار


//       return volume * 50 // متوسط مضاعف حجم التداول لـ market cap
//     }
//   } catch (error) {
//     console.warn(`[Binance] Failed to fetch volume for ${symbol}:`, error)
//   }

//   return 0
// }
// async function extractCurrenciesFromText(text: string): Promise<Array<{
//   code: string;
//   title: string;
//   slug: string;
//   market_cap_usd?: number;
//   price_in_usd?: number;
//   price_in_btc?: number;
//   market_rank?: number;
// }>> {
//   const currencyMappings: { [key: string]: { code: string, title: string, slug: string } } = {
//     'BTC': { code: 'BTC', title: 'Bitcoin', slug: 'bitcoin' },
//     'ETH': { code: 'ETH', title: 'Ethereum', slug: 'ethereum' },
//     'USDT': { code: 'USDT', title: 'Tether', slug: 'tether' },
//     'BNB': { code: 'BNB', title: 'Binance Coin', slug: 'binance-coin' },
//     'SOL': { code: 'SOL', title: 'Solana', slug: 'solana' },
//     'XRP': { code: 'XRP', title: 'Ripple', slug: 'ripple' },
//     'ADA': { code: 'ADA', title: 'Cardano', slug: 'cardano' },
//     'DOGE': { code: 'DOGE', title: 'Dogecoin', slug: 'dogecoin' },
//     'DOT': { code: 'DOT', title: 'Polkadot', slug: 'polkadot' },
//     'MATIC': { code: 'MATIC', title: 'Polygon', slug: 'polygon' },
//     'AVAX': { code: 'AVAX', title: 'Avalanche', slug: 'avalanche' },
//     'LTC': { code: 'LTC', title: 'Litecoin', slug: 'litecoin' },
//     'LINK': { code: 'LINK', title: 'Chainlink', slug: 'chainlink' },
//     'UNI': { code: 'UNI', title: 'Uniswap', slug: 'uniswap' },
//     'ATOM': { code: 'ATOM', title: 'Cosmos', slug: 'cosmos' }
//   }

//   const found: { [key: string]: boolean } = {}
//   const results = []

//   for (const [symbol, currency] of Object.entries(currencyMappings)) {
//     const symbolRegex = new RegExp(`\\b${symbol}\\b`, 'i')
//     const titleRegex = new RegExp(`\\b${currency.title}\\b`, 'i')

//     if (symbolRegex.test(text) || titleRegex.test(text)) {
//       if (!found[symbol]) {
//         found[symbol] = true

//         try {
//           // جلب السعر الحقيقي من Binance
//           const priceData = await fetchBinancePrice(symbol)

//           if (priceData && priceData.price_in_usd > 0) {
//             // جلب market cap تقديري
//             const marketCap = await getEstimatedMarketCap(symbol, priceData.price_in_usd)

//             results.push({
//               code: currency.code,
//               title: currency.title,
//               slug: currency.slug,
//               price_in_usd: priceData.price_in_usd,
//               price_in_btc: priceData.price_in_btc,
//               market_cap_usd: marketCap > 0 ? marketCap : undefined,
//               market_rank: undefined // Binance ما بيعطي ranking
//             })
//           } else {
//             // إذا فشل جلب السعر، نضيف العملة بدون بيانات السوق
//             results.push({
//               code: currency.code,
//               title: currency.title,
//               slug: currency.slug
//             })
//           }
//         } catch (error) {
//           console.warn(`Error fetching Binance data for ${symbol}:`, error)
//           results.push({
//             code: currency.code,
//             title: currency.title,
//             slug: currency.slug
//           })
//         }
//       }
//     }
//   }

//   return results
// }






// function analyzeSentiment(title: string, description: string): 'bullish' | 'bearish' | 'neutral' {
//   const text = (title + ' ' + description).toLowerCase()

//   const bullishWords = [
//     'buy', 'bullish', 'surge', 'rally', 'growth', 'adoption', 'partnership',
//     'launch', 'approval', 'positive', 'breakout', 'moon', 'pump', 'gain',
//     'success', 'win', 'victory', 'achievement', 'breakthrough', 'innovation'
//   ]

//   const bearishWords = [
//     'sell', 'bearish', 'drop', 'crash', 'warning', 'risk', 'regulation',
//     'ban', 'negative', 'concern', 'dump', 'collapse', 'loss', 'failure',
//     'problem', 'issue', 'warning', 'caution', 'decline', 'downturn'
//   ]

//   let bullishScore = 0
//   let bearishScore = 0

//   bullishWords.forEach(word => {
//     const regex = new RegExp(`\\b${word}\\b`, 'gi')
//     const matches = text.match(regex)
//     if (matches) bullishScore += matches.length
//   })

//   bearishWords.forEach(word => {
//     const regex = new RegExp(`\\b${word}\\b`, 'gi')
//     const matches = text.match(regex)
//     if (matches) bearishScore += matches.length
//   })

//   if (bullishScore > bearishScore + 2) return 'bullish'
//   if (bearishScore > bullishScore + 2) return 'bearish'
//   return 'neutral'
// }

// // إزالة الدالة الوهمية لإنشاء التصويتات واستبدالها بقيم افتراضية حقيقية
// function getDefaultVotes(): any {
//   return {
//     positive: 0,
//     negative: 0,
//     important: 0,
//     liked: 0,
//     disliked: 0,
//     lol: 0,
//     toxic: 0,
//     saved: 0,
//     comments: 0
//   }
// }

// function extractImageFromContent(description: string): string | undefined {
//   const imageRegex = /<img[^>]+src="([^">]+)"/g
//   const match = imageRegex.exec(description)
//   return match ? match[1] : undefined
// }
// function cleanHtmlContent(html: string): string {
//   if (!html) return '';

//   // تنظيف HTML مع الاحتفاظ بالمحتوى الحقيقي
//   let cleanText = html
//     .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
//     .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
//     .replace(/<[^>]*>/g, ' ')
//     .replace(/&nbsp;/g, ' ')
//     .replace(/&amp;/g, '&')
//     .replace(/&lt;/g, '<')
//     .replace(/&gt;/g, '>')
//     .replace(/&quot;/g, '"')
//     .replace(/\s+/g, ' ')
//     .trim();

//   // إذا النص قصير، ممكن نبحث في محتوى أعمق
//   if (cleanText.length < 100) {
//     // محاولة استخراج نص من وصف أطول
//     const paragraphs = html.match(/<p[^>]*>(.*?)<\/p>/gi);
//     if (paragraphs) {
//       const fullText = paragraphs.map(p => p.replace(/<[^>]*>/g, '')).join(' ');
//       if (fullText.length > cleanText.length) {
//         cleanText = fullText;
//       }
//     }
//   }

//   return cleanText;
// }
// // إزالة الدالة الوهمية لدرجات الذعر
// function getDefaultPanicScore(): number {
//   return 50 // قيمة متوسطة افتراضية
// }







// async function fetchRealMarketData(currencySlug: string): Promise<{
//   market_cap_usd: number;
//   price_in_usd: number;
//   price_in_btc: number;
//   market_rank: number;
// } | null> {
//   const cacheKey = `market-data-${currencySlug}`
//   const cached = memoryCache.get(cacheKey)
//   if (cached) return cached

//   try {
//     const response = await retryFetch(
//       `${COINGECKO_BASE_URL}/coins/${currencySlug}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`,
//       {
//         signal: AbortSignal.timeout(5000)
//       }
//     )

//     if (response.ok) {
//       const data = await response.json()
//       const marketData = data.market_data

//       const result = {
//         market_cap_usd: marketData.market_cap?.usd || 0,
//         price_in_usd: marketData.current_price?.usd || 0,
//         price_in_btc: marketData.current_price?.btc || 0,
//         market_rank: data.market_cap_rank || 0
//       }

//       // نتأكد أن كل البيانات موجودة
//       if (result.market_cap_usd > 0 && result.price_in_usd > 0) {
//         memoryCache.set(cacheKey, result, MARKET_DATA_CACHE_TTL)
//         return result
//       }
//     }
//   } catch (error) {
//     console.warn(`[CoinGecko] Failed to fetch real data for ${currencySlug}:`, error)
//   }

//   return null
// }
// // --- RSS Feeds المحسنة باستخدام البيانات الحقيقية فقط ---
// async function fetchFromRSSFeeds(): Promise<NewsArticle[] | null> {
//   const cacheKey = `rss-news`
//   const cached = memoryCache.get<NewsArticle[]>(cacheKey)
//   if (cached) {
//     console.log(`✅ [RSS] Cache hit: ${cached.length} articles`)
//     return cached
//   }

//   try {
//     // مصادر RSS موثوقة
//     const rssFeeds = [
//       {
//         url: 'https://cointelegraph.com/rss',
//         name: 'CoinTelegraph',
//         domain: 'cointelegraph.com'
//       },
//       {
//         url: 'https://decrypt.co/feed',
//         name: 'Decrypt',
//         domain: 'decrypt.co'
//       },
//       {
//         url: 'https://cryptoslate.com/feed/',
//         name: 'CryptoSlate',
//         domain: 'cryptoslate.com'
//       }
//     ]

//     const fetchPromises = rssFeeds.map(async (feed) => {
//       try {
//         const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`
//         console.log(`🔍 [RSS] Fetching from ${feed.name}...`)

//         const response = await retryFetch(rssToJsonUrl, {
//           signal: AbortSignal.timeout(8000)
//         })

//         if (response.ok) {
//           const data = await response.json()
//           if (data.items && Array.isArray(data.items)) {
//             console.log(`📥 [${feed.name}] Received ${data.items.length} items`)

//             const articles = data.items.slice(0, 10).map((item: any, index: number) => {
//               const cleanDescription = cleanHtmlContent(item.description || item.content || '');
//               // التأكد من أن لدينا محتوى حقيقي
//               let realContent = cleanDescription;
//               if (!realContent || realContent.length < 50) {
//                 realContent = item.title + ". Read the full article for complete market analysis.";
//               }

   
//               const currencies = extractCurrenciesFromText(item.title + ' ' + realContent);
//               const sentiment = analyzeSentiment(item.title, realContent);
//               const imageUrl = extractImageFromContent(item.description) || item.thumbnail || item.enclosure?.url;

//               // إنشاء ID آمن للـ URL
//               const safeId = generateSafeId(item.title, index)


//               return {
//                 id: safeId,
//                 title: item.title,
//                 description: realContent.substring(0, 250) + (realContent.length > 250 ? '...' : ''),
//                 url: item.link,
//                 original_url: item.link,
//                 source: {
//                   title: data.feed?.title || feed.name,
//                   domain: new URL(item.link).hostname,
//                   region: "en",
//                   type: "news"
//                 },
//                 published_at: item.pubDate || new Date().toISOString(),
//                 created_at: new Date().toISOString(),
//                 kind: "news",
//                 currencies: currencies,
//                 votes: getDefaultVotes(),
//                 content: {
//                   original: item.description || realContent,
//                   clean: realContent
//                 },
//                 image_url: imageUrl,
//                 author: item.author || data.feed?.title || feed.name,
//                 sentiment: sentiment,
//                 panic_score: getDefaultPanicScore(),
//                 metadata: {
//                   feed_source: feed.name,
//                   original_source: feed.domain,
//                   content_length: realContent.length,
//                   has_meaningful_content: realContent.length > 100
//                 }
//               }
//             });

//             console.log(`✅ [${feed.name}] Processed ${articles.length} articles`)
//             return articles
//           }
//         } else {
//           console.warn(`[${feed.name}] HTTP error: ${response.status}`)
//         }
//       } catch (error) {
//         console.warn(`[${feed.name}] Fetch error:`, error)
//       }
//       return []
//     })

//     console.log('🔄 [RSS] Fetching all feeds in parallel...')
//     const results = await Promise.allSettled(fetchPromises)
//     const allArticles = results
//       .filter((result): result is PromiseFulfilledResult<NewsArticle[]> => result.status === 'fulfilled')
//       .flatMap(result => result.value)

//     // إزالة التكرارات وإنشاء IDs فريدة
//     const uniqueArticlesMap = new Map()

//     allArticles.forEach(article => {
//       const uniqueKey = `${article.title}-${new Date(article.published_at).getTime()}`
//       if (!uniqueArticlesMap.has(uniqueKey)) {
//         let finalId = article.id
//         let counter = 1
//         while (Array.from(uniqueArticlesMap.values()).some(a => a.id === finalId)) {
//           finalId = `${article.id}-${counter}`
//           counter++
//         }

//         uniqueArticlesMap.set(uniqueKey, {
//           ...article,
//           id: finalId
//         })
//       }
//     })

//     const uniqueArticles = Array.from(uniqueArticlesMap.values())

//     if (uniqueArticles.length > 0) {
//       memoryCache.set(cacheKey, uniqueArticles, NEWS_CACHE_TTL)
//       console.log(`🎉 [RSS] Successfully cached ${uniqueArticles.length} unique articles`)

//       // إحصائيات حقيقية من البيانات المستخرجة
//       console.log('📊 RSS REAL DATA STATISTICS:')
//       console.log(`- Total articles: ${uniqueArticles.length}`)
//       console.log(`- With images: ${uniqueArticles.filter(a => a.image_url).length}`)
//       console.log(`- With currencies: ${uniqueArticles.filter(a => a.currencies.length > 0).length}`)
//       console.log(`- Bullish: ${uniqueArticles.filter(a => a.sentiment === 'bullish').length}`)
//       console.log(`- Bearish: ${uniqueArticles.filter(a => a.sentiment === 'bearish').length}`)
//       console.log(`- Sources: ${[...new Set(uniqueArticles.map(a => a.source.title))].join(', ')}`)

//       return uniqueArticles
//     } else {
//       console.warn('⚠️ [RSS] No articles processed from any feed')
//     }

//     return uniqueArticles.length > 0 ? uniqueArticles : null

//   } catch (err) {
//     console.error("[RSS] Global fetch error:", err)
//     return null
//   }
// }

// // --- الدالة الرئيسية المعدلة ---
// async function getAggregatedNews(limit = 30): Promise<NewsArticle[]> {
//   const cacheKey = `aggregated-news`
//   const cached = memoryCache.get<NewsArticle[]>(cacheKey)
//   if (cached) {
//     console.log(`✅ [Aggregator] Cache hit: ${cached.length} articles`)
//     return cached.slice(0, limit)
//   }

//   console.log(`🔄 [Aggregator] Fetching from RSS sources...`)

//   try {
//     const rssResults = await fetchFromRSSFeeds()
//     let allArticles: NewsArticle[] = []

//     if (rssResults && rssResults.length > 0) {
//       console.log(`✅ [Aggregator] RSS delivered ${rssResults.length} articles`)
//       allArticles = rssResults
//     } else {
//       console.warn('⚠️ [Aggregator] No RSS results')
//       // في حالة عدم وجود بيانات، نرجع مصفوفة فارغة بدلاً من بيانات وهمية
//       allArticles = []
//     }

//     memoryCache.set(cacheKey, allArticles, NEWS_CACHE_TTL)

//     console.log(`🎉 [Aggregator] Final result: ${allArticles.length} real articles`)
//     console.log('📈 REAL DATA STATISTICS:')
//     console.log(`- Total articles: ${allArticles.length}`)
//     console.log(`- With images: ${allArticles.filter(a => a.image_url).length}`)
//     console.log(`- Articles with currencies: ${allArticles.filter(a => a.currencies.length > 0).length}`)
//     console.log(`- Average title length: ${(allArticles.reduce((sum, a) => sum + a.title.length, 0) / allArticles.length).toFixed(1)}`)

//     return allArticles.slice(0, limit)

//   } catch (error) {
//     console.error('❌ [Aggregator] Critical error:', error)
//     return [] // إرجاع مصفوفة فارغة بدلاً من بيانات وهمية
//   }
// }

// // ---------- Exposed API ----------
// export const cryptoNewsAPI = {
//   async getHotNews(limit = 20): Promise<NewsArticle[]> {
//     const allNews = await getAggregatedNews(limit + 10)
//     return allNews
//       .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
//       .slice(0, limit)
//   },

//   async getRisingNews(limit = 15): Promise<NewsArticle[]> {
//     const allNews = await getAggregatedNews(limit + 10)
//     return allNews
//       .filter(article => article.sentiment === 'bullish')
//       .slice(0, limit)
//   },

//   async getBullishNews(limit = 15): Promise<NewsArticle[]> {
//     const allNews = await getAggregatedNews(30)
//     return allNews
//       .filter(article => article.sentiment === 'bullish')
//       .slice(0, limit)
//   },

//   async getBearishNews(limit = 15): Promise<NewsArticle[]> {
//     const allNews = await getAggregatedNews(30)
//     return allNews
//       .filter(article => article.sentiment === 'bearish')
//       .slice(0, limit)
//   },

//   async getImportantNews(limit = 15): Promise<NewsArticle[]> {
//     const allNews = await getAggregatedNews(30)
//     return allNews
//       .filter(article => article.currencies.length > 0)
//       .slice(0, limit)
//   },

//   async getAllNews(limit = 30): Promise<NewsArticle[]> {
//     return await getAggregatedNews(limit)
//   },

//   async getArticleById(id: string): Promise<NewsArticle | null> {
//     try {
//       const allNews = await this.getAllNews(50)
//       const found = allNews.find(article => article.id === id)

//       if (found) {
//         console.log(`✅ Found article: "${found.title}"`)
//         return found
//       } else {
//         console.warn(`❌ Article not found: ${id}`)
//         const alternativeMatch = allNews.find(article =>
//           article.id.includes(id) || id.includes(article.id)
//         )
//         if (alternativeMatch) {
//           console.log(`🔄 Found alternative match for: ${id}`)
//           return alternativeMatch
//         }
//       }

//       return null
//     } catch (error) {
//       console.error(`Error finding article ${id}:`, error)
//       return null
//     }
//   },

//   async getNewsByCurrency(currencyCode: string, limit = 15): Promise<NewsArticle[]> {
//     const allNews = await this.getAllNews(50)
//     const filtered = allNews
//       .filter(article =>
//         article.currencies.some(c => c.code === currencyCode.toUpperCase()) ||
//         article.title.toUpperCase().includes(currencyCode.toUpperCase()) ||
//         article.description.toUpperCase().includes(currencyCode.toUpperCase())
//       )
//       .slice(0, limit)

//     console.log(`🔍 Found ${filtered.length} articles for ${currencyCode}`)
//     return filtered
//   },

//   async searchNews(query: string, limit = 15): Promise<NewsArticle[]> {
//     const allNews = await this.getAllNews(50)
//     const searchResults = allNews.filter(article =>
//       article.title.toLowerCase().includes(query.toLowerCase()) ||
//       article.description.toLowerCase().includes(query.toLowerCase()) ||
//       article.currencies.some(currency =>
//         currency.code.toLowerCase().includes(query.toLowerCase()) ||
//         currency.title.toLowerCase().includes(query.toLowerCase())
//       )
//     ).slice(0, limit)

//     console.log(`🔍 Search for "${query}" returned ${searchResults.length} results`)
//     return searchResults
//   },

//   checkAPIStatus: async function () {
//     try {
//       const rssData = await fetchFromRSSFeeds()
//       return {
//         status: rssData && rssData.length > 0 ? 'healthy' : 'no_data',
//         timestamp: new Date().toISOString(),
//         articlesAvailable: rssData?.length || 0,
//         cacheStatus: 'active',
//         sources: ['CoinTelegraph', 'Decrypt', 'CryptoSlate']
//       }
//     } catch (error) {
//       return {
//         status: 'error',
//         error: error instanceof Error ? error.message : 'Unknown error',
//         sources: ['CoinTelegraph', 'Decrypt', 'CryptoSlate']
//       }
//     }
//   },

//   clearCache: function () {
//     const cacheKeys = ['rss-news', 'aggregated-news']
//     cacheKeys.forEach(key => memoryCache.delete(key))
//     console.log('🧹 News cache cleared')
//   },

//   getStats: async function () {
//     const allNews = await this.getAllNews(50)
//     return {
//       totalArticles: allNews.length,
//       sources: [...new Set(allNews.map(a => a.source.title))],
//       sentiment: {
//         bullish: allNews.filter(a => a.sentiment === 'bullish').length,
//         bearish: allNews.filter(a => a.sentiment === 'bearish').length,
//         neutral: allNews.filter(a => a.sentiment === 'neutral').length
//       },
//       contentQuality: {
//         withImages: allNews.filter(a => a.image_url).length,
//         withCurrencies: allNews.filter(a => a.currencies.length > 0).length,
//         averageDescriptionLength: Math.round(allNews.reduce((sum, a) => sum + a.description.length, 0) / allNews.length)
//       }
//     }
//   }
// }