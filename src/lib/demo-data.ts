export const DEMO_BUSINESS = {
  id: "demo-biz-001",
  userId: "demo-user",
  name: "Sakura Bistro",
  slug: "sakura-bistro",
  category: "restaurant",
  description: "Modern Japanese fusion restaurant in downtown",
  address: "123 Main Street, San Francisco, CA",
  phone: "(415) 555-0123",
  website: "https://sakurabistro.com",
  primaryColor: "#1a3a2a",
  googleConnected: true,
  yelpConnected: false,
  facebookConnected: true,
  autoRespond: false,
  createdAt: new Date("2025-10-01"),
  updatedAt: new Date("2026-02-20"),
}

const now = new Date()
function daysAgo(days: number) {
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000).toISOString()
}

export const DEMO_REVIEWS = [
  {
    id: "rev-001",
    businessId: "demo-biz-001",
    customerName: "Sarah M.",
    customerEmail: "sarah@example.com",
    rating: 5,
    rawInput: "food was amazing and jake our waiter was super nice",
    rawInputType: "voice",
    generatedReview: "Had an absolutely wonderful dinner at Sakura Bistro last night. The food was genuinely impressive. Every dish was beautifully presented and packed with flavor. Our waiter Jake was outstanding, attentive without being intrusive, and made great recommendations. We'll definitely be coming back!",
    finalReview: "Had an absolutely wonderful dinner at Sakura Bistro last night. The food was genuinely impressive. Every dish was beautifully presented and packed with flavor. Our waiter Jake was outstanding, attentive without being intrusive, and made great recommendations. We'll definitely be coming back!",
    platform: "google",
    sentiment: "positive",
    topics: JSON.stringify(["food quality", "service", "atmosphere"]),
    source: "qr",
    postedToPlatform: true,
    createdAt: daysAgo(1),
  },
  {
    id: "rev-002",
    businessId: "demo-biz-001",
    customerName: "Mike R.",
    customerEmail: "mike@example.com",
    rating: 5,
    rawInput: "best sushi in the city hands down",
    rawInputType: "voice",
    generatedReview: "Sakura Bistro serves hands down the best sushi in San Francisco. The fish is incredibly fresh, the rice is perfectly seasoned, and the presentation is art. The omakase is a must-try. Every course was a surprise and delight. Already planning my next visit.",
    finalReview: "Sakura Bistro serves hands down the best sushi in San Francisco. The fish is incredibly fresh, the rice is perfectly seasoned, and the presentation is art. The omakase is a must-try. Every course was a surprise and delight. Already planning my next visit.",
    platform: "google",
    sentiment: "positive",
    topics: JSON.stringify(["food quality", "sushi", "presentation"]),
    source: "link",
    postedToPlatform: true,
    createdAt: daysAgo(2),
  },
  {
    id: "rev-003",
    businessId: "demo-biz-001",
    customerName: "Emily C.",
    customerEmail: null,
    rating: 4,
    rawInput: "great ambiance, cocktails were strong, food took a while",
    rawInputType: "voice",
    generatedReview: "Lovely ambiance at Sakura Bistro. The interior design is stunning and the vibe is perfect for date night. The cocktail menu is creative and the drinks are well-crafted. Food did take a bit longer than expected, but the quality made up for the wait. Would recommend for a special evening out.",
    finalReview: "Lovely ambiance at Sakura Bistro. The interior design is stunning and the vibe is perfect for date night. The cocktail menu is creative and the drinks are well-crafted. Food did take a bit longer than expected, but the quality made up for the wait. Would recommend for a special evening out.",
    platform: "yelp",
    sentiment: "positive",
    topics: JSON.stringify(["atmosphere", "cocktails", "wait time"]),
    source: "sms",
    postedToPlatform: true,
    createdAt: daysAgo(3),
  },
  {
    id: "rev-004",
    businessId: "demo-biz-001",
    customerName: "David L.",
    customerEmail: "david@example.com",
    rating: 5,
    rawInput: "my wife loved the dessert and the staff remembered our anniversary",
    rawInputType: "voice",
    generatedReview: "We celebrated our anniversary at Sakura Bistro and the staff made it truly memorable. They remembered our occasion and brought out a special dessert with a congratulations note. My wife was thrilled. The matcha cheesecake was incredible. This level of personal touch is rare; thank you, Sakura Bistro!",
    finalReview: "We celebrated our anniversary at Sakura Bistro and the staff made it truly memorable. They remembered our occasion and brought out a special dessert with a congratulations note. My wife was thrilled. The matcha cheesecake was incredible. This level of personal touch is rare; thank you, Sakura Bistro!",
    platform: "google",
    sentiment: "positive",
    topics: JSON.stringify(["service", "dessert", "special occasion"]),
    source: "qr",
    postedToPlatform: true,
    createdAt: daysAgo(4),
  },
  {
    id: "rev-005",
    businessId: "demo-biz-001",
    customerName: "Jessica P.",
    customerEmail: null,
    rating: 3,
    rawInput: "food was ok, parking was terrible",
    rawInputType: "text",
    generatedReview: "The food at Sakura Bistro was decent, nothing extraordinary but certainly acceptable. However, parking in the area is a real challenge. We circled the block several times before finding a spot. The restaurant might benefit from partnering with a nearby garage for validated parking.",
    finalReview: "The food at Sakura Bistro was decent, nothing extraordinary but certainly acceptable. However, parking in the area is a real challenge. We circled the block several times before finding a spot. The restaurant might benefit from partnering with a nearby garage for validated parking.",
    platform: "google",
    sentiment: "neutral",
    topics: JSON.stringify(["food quality", "parking"]),
    source: "link",
    postedToPlatform: false,
    createdAt: daysAgo(5),
  },
  {
    id: "rev-006",
    businessId: "demo-biz-001",
    customerName: "Alex T.",
    customerEmail: "alex@example.com",
    rating: 5,
    rawInput: "ramen was incredible, broth was so rich",
    rawInputType: "voice",
    generatedReview: "The tonkotsu ramen at Sakura Bistro is in a league of its own. The broth is incredibly rich and deeply flavored; you can tell it's been simmered for hours. The noodles had perfect texture and the chashu pork was melt-in-your-mouth tender. Best ramen I've had outside of Japan.",
    finalReview: "The tonkotsu ramen at Sakura Bistro is in a league of its own. The broth is incredibly rich and deeply flavored; you can tell it's been simmered for hours. The noodles had perfect texture and the chashu pork was melt-in-your-mouth tender. Best ramen I've had outside of Japan.",
    platform: "google",
    sentiment: "positive",
    topics: JSON.stringify(["ramen", "food quality"]),
    source: "qr",
    postedToPlatform: true,
    createdAt: daysAgo(6),
  },
  {
    id: "rev-007",
    businessId: "demo-biz-001",
    customerName: "Rachel K.",
    customerEmail: null,
    rating: 4,
    rawInput: "lunch specials are a great deal, wish they had more vegetarian options",
    rawInputType: "text",
    generatedReview: "Sakura Bistro's lunch specials are an excellent value, with generous portions at very reasonable prices. The bento box lunch is my go-to. My only suggestion would be to expand the vegetarian options. While they have a few, more variety would be welcome for plant-based diners like myself.",
    finalReview: "Sakura Bistro's lunch specials are an excellent value, with generous portions at very reasonable prices. The bento box lunch is my go-to. My only suggestion would be to expand the vegetarian options. While they have a few, more variety would be welcome for plant-based diners like myself.",
    platform: "yelp",
    sentiment: "positive",
    topics: JSON.stringify(["value", "vegetarian", "lunch"]),
    source: "link",
    postedToPlatform: true,
    createdAt: daysAgo(8),
  },
  {
    id: "rev-008",
    businessId: "demo-biz-001",
    customerName: "Tom W.",
    customerEmail: "tom@example.com",
    rating: 2,
    rawInput: "waited 45 minutes for our table even with a reservation",
    rawInputType: "voice",
    generatedReview: "Unfortunately, our experience at Sakura Bistro was marred by an excessive wait. Despite having a reservation, we waited 45 minutes for our table. The host was apologetic but it put a damper on the evening. The food was fine once we finally sat down, but the wait was unacceptable.",
    finalReview: "Unfortunately, our experience at Sakura Bistro was marred by an excessive wait. Despite having a reservation, we waited 45 minutes for our table. The host was apologetic but it put a damper on the evening. The food was fine once we finally sat down, but the wait was unacceptable.",
    platform: "google",
    sentiment: "negative",
    topics: JSON.stringify(["wait time", "reservation"]),
    source: "link",
    postedToPlatform: false,
    createdAt: daysAgo(10),
  },
  {
    id: "rev-009",
    businessId: "demo-biz-001",
    customerName: "Nina S.",
    customerEmail: "nina@example.com",
    rating: 5,
    rawInput: "the happy hour is unbeatable, love the edamame and gyoza",
    rawInputType: "voice",
    generatedReview: "Sakura Bistro's happy hour is seriously underrated. The prices are fantastic and the food quality doesn't dip one bit. The edamame is perfectly salted and the gyoza are crispy, juicy perfection. Pair with their yuzu highball and you've got yourself an unbeatable evening. We come here every Friday!",
    finalReview: "Sakura Bistro's happy hour is seriously underrated. The prices are fantastic and the food quality doesn't dip one bit. The edamame is perfectly salted and the gyoza are crispy, juicy perfection. Pair with their yuzu highball and you've got yourself an unbeatable evening. We come here every Friday!",
    platform: "facebook",
    sentiment: "positive",
    topics: JSON.stringify(["happy hour", "value", "appetizers"]),
    source: "sms",
    postedToPlatform: true,
    createdAt: daysAgo(12),
  },
  {
    id: "rev-010",
    businessId: "demo-biz-001",
    customerName: "Carlos G.",
    customerEmail: null,
    rating: 5,
    rawInput: "brought my family, kids loved the teriyaki chicken, great family spot",
    rawInputType: "voice",
    generatedReview: "Sakura Bistro is a fantastic family restaurant. We brought our two kids and they absolutely loved the teriyaki chicken; they cleaned their plates! The staff was incredibly accommodating with the kids, bringing out crayons and paper without us even asking. Great portions, great prices, and a welcoming atmosphere for families.",
    finalReview: "Sakura Bistro is a fantastic family restaurant. We brought our two kids and they absolutely loved the teriyaki chicken; they cleaned their plates! The staff was incredibly accommodating with the kids, bringing out crayons and paper without us even asking. Great portions, great prices, and a welcoming atmosphere for families.",
    platform: "google",
    sentiment: "positive",
    topics: JSON.stringify(["family friendly", "food quality", "service"]),
    source: "qr",
    postedToPlatform: true,
    createdAt: daysAgo(14),
  },
  {
    id: "rev-011",
    businessId: "demo-biz-001",
    customerName: "Olivia H.",
    customerEmail: "olivia@example.com",
    rating: 4,
    rawInput: "great for date night, music was a bit loud though",
    rawInputType: "voice",
    generatedReview: "Sakura Bistro is a wonderful date night spot. The dim lighting, elegant decor, and creative cocktails set the perfect mood. The sashimi platter was beautiful and delicious. My only note is that the background music was a touch loud, making conversation a bit challenging. Otherwise, a lovely evening.",
    finalReview: "Sakura Bistro is a wonderful date night spot. The dim lighting, elegant decor, and creative cocktails set the perfect mood. The sashimi platter was beautiful and delicious. My only note is that the background music was a touch loud, making conversation a bit challenging. Otherwise, a lovely evening.",
    platform: "google",
    sentiment: "positive",
    topics: JSON.stringify(["date night", "atmosphere", "noise level"]),
    source: "link",
    postedToPlatform: true,
    createdAt: daysAgo(16),
  },
  {
    id: "rev-012",
    businessId: "demo-biz-001",
    customerName: "James B.",
    customerEmail: null,
    rating: 5,
    rawInput: "private dining room was perfect for our company dinner",
    rawInputType: "text",
    generatedReview: "We hosted our company dinner in Sakura Bistro's private dining room and it was perfection. The room comfortably seats 20, the service was excellent, and the prix fixe menu was put together beautifully. Every course was a hit with our team. The staff handled all the logistics smoothly. Highly recommend for corporate events.",
    finalReview: "We hosted our company dinner in Sakura Bistro's private dining room and it was perfection. The room comfortably seats 20, the service was excellent, and the prix fixe menu was put together beautifully. Every course was a hit with our team. The staff handled all the logistics smoothly. Highly recommend for corporate events.",
    platform: "google",
    sentiment: "positive",
    topics: JSON.stringify(["private dining", "corporate events", "service"]),
    source: "link",
    postedToPlatform: true,
    createdAt: daysAgo(20),
  },
]

export function getDemoInsights() {
  const reviews = DEMO_REVIEWS
  const totalReviews = reviews.length
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews

  const ratingDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach((r) => { ratingDistribution[r.rating]++ })

  const sentimentBreakdown = { positive: 0, neutral: 0, negative: 0 }
  reviews.forEach((r) => {
    const s = r.sentiment as keyof typeof sentimentBreakdown
    if (sentimentBreakdown[s] !== undefined) sentimentBreakdown[s]++
  })

  const topicCounts: Record<string, { count: number; positive: number; negative: number }> = {}
  reviews.forEach((r) => {
    const topics: string[] = JSON.parse(r.topics)
    topics.forEach((t) => {
      if (!topicCounts[t]) topicCounts[t] = { count: 0, positive: 0, negative: 0 }
      topicCounts[t].count++
      if (r.sentiment === "positive") topicCounts[t].positive++
      if (r.sentiment === "negative") topicCounts[t].negative++
    })
  })

  const topTopics = Object.entries(topicCounts)
    .map(([topic, data]) => ({
      topic,
      mentions: data.count,
      positiveCount: data.positive,
      negativeCount: data.negative,
      sentimentScore: data.count > 0 ? (data.positive - data.negative) / data.count : 0,
    }))
    .sort((a, b) => b.mentions - a.mentions)
    .slice(0, 10)

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const recentReviews = reviews.filter((r) => new Date(r.createdAt) >= thirtyDaysAgo)

  const dailyData: Record<string, { count: number; totalRating: number }> = {}
  recentReviews.forEach((r) => {
    const day = new Date(r.createdAt).toISOString().split("T")[0]
    if (!dailyData[day]) dailyData[day] = { count: 0, totalRating: 0 }
    dailyData[day].count++
    dailyData[day].totalRating += r.rating
  })

  const recentTrend = Object.entries(dailyData)
    .map(([date, data]) => ({
      date,
      reviews: data.count,
      avgRating: data.totalRating / data.count,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))

  const sourceBreakdown: Record<string, number> = {}
  reviews.forEach((r) => {
    sourceBreakdown[r.source] = (sourceBreakdown[r.source] || 0) + 1
  })

  return {
    totalReviews,
    averageRating: Math.round(avgRating * 100) / 100,
    ratingDistribution,
    sentimentBreakdown,
    topTopics,
    recentTrend,
    sourceBreakdown,
  }
}
