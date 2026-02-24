// AI Transformation Engine
// Generates polished, human-sounding reviews and contextual responses
// Uses pattern-based generation with high variance to avoid template fatigue

// ============ ENTITY EXTRACTION ============

interface ExtractedEntities {
  people: string[]     // "Sarah", "Marco", "the waiter"
  dishes: string[]     // "carbonara", "the steak", "pasta"
  drinks: string[]     // "margarita", "wine", "coffee"
  adjectives: string[] // "amazing", "terrible", "quick"
  places: string[]     // "patio", "bar area", "upstairs"
  specifics: string[]  // anything unique from the input
}

function extractEntities(input: string): ExtractedEntities {
  const entities: ExtractedEntities = {
    people: [],
    dishes: [],
    drinks: [],
    adjectives: [],
    places: [],
    specifics: [],
  }

  // Extract proper names (capitalized words that aren't sentence starters)
  const namePattern = /\b(?:with|by|named|called|our|server|waiter|waitress|bartender|chef|doctor|dr|nurse|hygienist|technician|stylist|barber)\s+([A-Z][a-z]+)/gi
  let match
  while ((match = namePattern.exec(input)) !== null) {
    entities.people.push(match[1])
  }

  // Also look for standalone capitalized names after common patterns
  const standaloneNames = input.match(/(?:^|\.\s+)([A-Z][a-z]{2,})\s+(?:was|is|helped|made|took|brought)/g)
  if (standaloneNames) {
    standaloneNames.forEach(m => {
      const name = m.replace(/^[\.\s]+/, "").split(/\s/)[0]
      if (!["The", "Our", "My", "Her", "His", "Their", "This", "That", "Very"].includes(name)) {
        entities.people.push(name)
      }
    })
  }

  const lowerInput = input.toLowerCase()

  // Food items
  const foodWords = [
    "pizza", "pasta", "steak", "burger", "salad", "soup", "sushi", "tacos",
    "chicken", "fish", "salmon", "lobster", "shrimp", "ribs", "wings",
    "carbonara", "risotto", "ramen", "pho", "pad thai", "curry", "tikka",
    "sandwich", "wrap", "bowl", "appetizer", "entree", "dessert",
    "cake", "pie", "tiramisu", "cheesecake", "ice cream", "brownie",
    "fries", "bread", "bruschetta", "calamari", "nachos", "hummus",
    "breakfast", "brunch", "lunch", "dinner", "omelette", "pancakes",
    "osso buco", "filet", "wagyu", "tartare", "ceviche",
  ]
  foodWords.forEach(f => {
    if (lowerInput.includes(f)) entities.dishes.push(f)
  })

  // Drink items
  const drinkWords = [
    "wine", "beer", "cocktail", "margarita", "martini", "mojito",
    "coffee", "espresso", "latte", "cappuccino", "tea", "matcha",
    "sangria", "mimosa", "champagne", "prosecco", "bourbon", "whiskey",
    "old fashioned", "negroni", "daiquiri", "cosmopolitan",
  ]
  drinkWords.forEach(d => {
    if (lowerInput.includes(d)) entities.drinks.push(d)
  })

  // Place references
  const placeWords = [
    "patio", "terrace", "rooftop", "bar", "counter", "booth", "window",
    "upstairs", "downstairs", "garden", "lounge", "deck", "balcony",
    "outdoor", "inside", "fireplace", "corner", "private room",
  ]
  placeWords.forEach(p => {
    if (lowerInput.includes(p)) entities.places.push(p)
  })

  // Extract adjectives the customer used
  const adjPatterns = [
    "really (\\w+)", "so (\\w+)", "very (\\w+)", "super (\\w+)",
    "incredibly (\\w+)", "absolutely (\\w+)", "pretty (\\w+)",
    "was (\\w+)", "were (\\w+)", "is (\\w+)",
  ]
  adjPatterns.forEach(pat => {
    const re = new RegExp(pat, "gi")
    let m
    while ((m = re.exec(input)) !== null) {
      const word = m[1].toLowerCase()
      if (word.length > 3 && !["that", "this", "then", "them", "they", "what", "when", "just", "also", "been"].includes(word)) {
        entities.adjectives.push(word)
      }
    }
  })

  // Extract unique phrases as specifics (anything in quotes or after "especially", "loved the", etc.)
  const specificPatterns = [
    /(?:loved|liked|enjoyed|tried|had|got|ordered)\s+(?:the\s+)?(.{3,30}?)(?:\.|,|!|\band\b)/gi,
    /(?:especially|particularly)\s+(?:the\s+)?(.{3,30}?)(?:\.|,|!)/gi,
  ]
  specificPatterns.forEach(pat => {
    let m
    while ((m = pat.exec(input)) !== null) {
      entities.specifics.push(m[1].trim())
    }
  })

  return entities
}

// ============ TOPIC DETECTION ============

const TOPIC_KEYWORDS: Record<string, string[]> = {
  "food quality": ["food", "meal", "dish", "taste", "flavor", "delicious", "fresh", "cook", "chef", "menu", "portion", "ingredient", "seasoning", "plate", "presentation"],
  "service": ["service", "waiter", "waitress", "server", "staff", "friendly", "attentive", "helpful", "rude", "slow", "host", "hostess", "greeted", "seated"],
  "ambiance": ["ambiance", "atmosphere", "decor", "vibe", "cozy", "loud", "noise", "music", "lighting", "clean", "aesthetic", "beautiful", "romantic", "intimate"],
  "value": ["price", "value", "expensive", "cheap", "affordable", "worth", "cost", "money", "overpriced", "reasonable", "deal", "bang for"],
  "wait time": ["wait", "waited", "long", "quick", "fast", "slow", "time", "minutes", "hour", "reservation", "seated quickly", "took forever"],
  "cleanliness": ["clean", "dirty", "hygiene", "spotless", "messy", "tidy", "bathroom", "restroom", "sanitary"],
  "location": ["location", "parking", "accessible", "convenient", "find", "drive", "walk", "neighborhood", "area"],
  "drinks": ["drink", "cocktail", "wine", "beer", "coffee", "tea", "beverage", "bar", "bartender", "mixology"],
  "dessert": ["dessert", "sweet", "cake", "pie", "ice cream", "chocolate", "pastry", "tiramisu"],
  "professionalism": ["professional", "expertise", "knowledge", "experienced", "skilled", "competent", "thorough", "detailed"],
  "communication": ["communication", "responsive", "called", "email", "update", "informed", "explained", "transparent"],
  "results": ["results", "outcome", "fixed", "solved", "resolved", "satisfied", "happy", "exceeded", "perfect"],
  "comfort": ["comfortable", "relaxed", "at ease", "welcoming", "warm", "inviting"],
  "speed": ["fast", "quick", "efficient", "prompt", "timely", "speedy"],
}

function detectTopics(input: string): string[] {
  const lowerInput = input.toLowerCase()
  const detected: string[] = []

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (keywords.some(kw => lowerInput.includes(kw))) {
      detected.push(topic)
    }
  }

  return detected.length > 0 ? detected : ["overall experience"]
}

function detectSentiment(rating: number, input: string): "positive" | "neutral" | "negative" {
  if (rating >= 4) return "positive"
  if (rating <= 2) return "negative"

  const positiveWords = ["great", "good", "love", "amazing", "awesome", "excellent", "fantastic", "wonderful", "best", "happy", "perfect", "delicious", "beautiful"]
  const negativeWords = ["bad", "terrible", "awful", "horrible", "worst", "hate", "disgusting", "rude", "slow", "dirty", "cold", "disappointed", "mediocre"]

  const lower = input.toLowerCase()
  const posCount = positiveWords.filter(w => lower.includes(w)).length
  const negCount = negativeWords.filter(w => lower.includes(w)).length

  if (posCount > negCount) return "positive"
  if (negCount > posCount) return "negative"
  return "neutral"
}

// ============ REVIEW GENERATION ============

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Natural sentence connectors that vary between reviews
const TRANSITIONS = [
  "", " ", " Also, ", " Plus, ", " And ", " On top of that, ",
  " What really stood out was ", " I also have to mention ",
]

// ---- POSITIVE REVIEW TEMPLATES ----
// Each template is a function that takes context and returns a sentence
// Multiple variants per category for maximum variety

type ReviewContext = {
  businessName: string
  category: string
  entities: ExtractedEntities
  topics: string[]
  rawInput: string
  rating: number
}

const POSITIVE_OPENINGS = [
  (ctx: ReviewContext) => `Finally tried ${ctx.businessName} and wow, I've been missing out!`,
  (ctx: ReviewContext) => `Just had the best experience at ${ctx.businessName}. Absolutely blown away.`,
  (ctx: ReviewContext) => `${ctx.businessName} exceeded every expectation. So glad we came here.`,
  (ctx: ReviewContext) => `Can't say enough good things about ${ctx.businessName}.`,
  (ctx: ReviewContext) => `This was my first time at ${ctx.businessName} and it definitely won't be my last.`,
  (ctx: ReviewContext) => `${ctx.businessName} is the real deal. Not overhyped at all.`,
  (ctx: ReviewContext) => `I'm honestly shocked more people don't know about ${ctx.businessName}.`,
  (ctx: ReviewContext) => `Went to ${ctx.businessName} last night and I'm still thinking about it.`,
  (ctx: ReviewContext) => `If you haven't tried ${ctx.businessName} yet, you're seriously missing out.`,
  (ctx: ReviewContext) => `We've been looking for a good ${ctx.category === "restaurant" ? "spot" : "place"} and ${ctx.businessName} nailed it.`,
  (ctx: ReviewContext) => `${ctx.businessName} just became my new go-to. What a find!`,
  (ctx: ReviewContext) => `Had the pleasure of visiting ${ctx.businessName} recently and it did not disappoint.`,
]

const POSITIVE_4STAR_OPENINGS = [
  (ctx: ReviewContext) => `Really enjoyed our time at ${ctx.businessName}.`,
  (ctx: ReviewContext) => `${ctx.businessName} was great. Solid experience overall.`,
  (ctx: ReviewContext) => `Had a really good experience at ${ctx.businessName}. Would definitely go back.`,
  (ctx: ReviewContext) => `${ctx.businessName} is a great choice. Came in with high expectations and they delivered.`,
  (ctx: ReviewContext) => `We had a lovely time at ${ctx.businessName}. Very happy we tried it.`,
]

// Topic-specific sentence generators (multiple variants each)
const FOOD_QUALITY_SENTENCES = [
  (ctx: ReviewContext) => {
    if (ctx.entities.dishes.length > 0) {
      const dish = pickRandom(ctx.entities.dishes)
      return `The ${dish} was incredible - easily one of the best I've ever had.`
    }
    return "The food was on another level. Every bite was perfectly executed."
  },
  (ctx: ReviewContext) => {
    if (ctx.entities.dishes.length > 0) {
      const dish = pickRandom(ctx.entities.dishes)
      return `Got the ${dish} and it was absolutely phenomenal. You can taste the quality.`
    }
    return "You can tell they use real, quality ingredients here. Everything tasted fresh and homemade."
  },
  (ctx: ReviewContext) => {
    if (ctx.entities.dishes.length >= 2) {
      return `We tried the ${ctx.entities.dishes[0]} and the ${ctx.entities.dishes[1]} - both were outstanding.`
    }
    return "The food here is genuinely impressive. Not just good-for-the-price good, but actually great."
  },
  (ctx: ReviewContext) => "Everything we ordered was delicious. Not a single miss on the table.",
  (ctx: ReviewContext) => "The flavors were incredible and the presentation was beautiful. They clearly care about what they put out.",
  (ctx: ReviewContext) => {
    if (ctx.entities.dishes.length > 0) {
      return `The ${pickRandom(ctx.entities.dishes)} alone is worth the trip. Trust me on this one.`
    }
    return "The menu is thoughtfully curated and everything we tried was a hit."
  },
]

const SERVICE_SENTENCES = [
  (ctx: ReviewContext) => {
    if (ctx.entities.people.length > 0) {
      const person = pickRandom(ctx.entities.people)
      return `${person} was our server and made the whole experience so much better. Friendly, attentive, and genuinely great at their job.`
    }
    return "The staff were fantastic - friendly and attentive without hovering. Perfect balance."
  },
  (ctx: ReviewContext) => {
    if (ctx.entities.people.length > 0) {
      const person = pickRandom(ctx.entities.people)
      return `Shoutout to ${person} who took amazing care of us. Made great recommendations too.`
    }
    return "Service was top-notch from the moment we walked in. Everyone was so welcoming."
  },
  (ctx: ReviewContext) => "The team here clearly loves what they do. You can feel it in how they treat you.",
  (ctx: ReviewContext) => "We were greeted warmly and the service stayed consistently great throughout our visit.",
  (ctx: ReviewContext) => {
    if (ctx.entities.people.length > 0) {
      return `${pickRandom(ctx.entities.people)} went above and beyond for us. That kind of service is rare.`
    }
    return "Genuinely great service. They remembered our preferences and anticipated what we needed."
  },
]

const AMBIANCE_SENTENCES = [
  (ctx: ReviewContext) => {
    if (ctx.entities.places.length > 0) {
      return `The ${pickRandom(ctx.entities.places)} area is gorgeous. Such a great vibe.`
    }
    return "The ambiance is just right - cozy and inviting without trying too hard."
  },
  (ctx: ReviewContext) => "Love the atmosphere here. It's got that perfect mix of casual and classy.",
  (ctx: ReviewContext) => "The decor and lighting create such a nice mood. Great for a date night or catching up with friends.",
  (ctx: ReviewContext) => "Beautiful space with a really warm, welcoming feel. You want to linger.",
]

const VALUE_SENTENCES = [
  (ctx: ReviewContext) => "Honestly great value for what you get. The quality-to-price ratio is excellent.",
  (ctx: ReviewContext) => "Very fairly priced for the quality. You're getting way more than you'd expect.",
  (ctx: ReviewContext) => "Not the cheapest option out there, but absolutely worth every penny.",
  (ctx: ReviewContext) => "Incredible value. I've paid twice as much elsewhere for half the quality.",
]

const DRINKS_SENTENCES = [
  (ctx: ReviewContext) => {
    if (ctx.entities.drinks.length > 0) {
      return `The ${pickRandom(ctx.entities.drinks)} was perfectly made. Their drink game is strong.`
    }
    return "The drinks were excellent. Clearly someone behind the bar knows what they're doing."
  },
  (ctx: ReviewContext) => "Great drink selection and everything was well-crafted. Not your standard fare.",
  (ctx: ReviewContext) => {
    if (ctx.entities.drinks.length > 0) {
      return `Tried the ${pickRandom(ctx.entities.drinks)} and it was spot-on. Will be ordering that again.`
    }
    return "The bar program here is legit. Creative cocktails that actually taste good."
  },
]

const SPEED_SENTENCES = [
  (ctx: ReviewContext) => "Everything came out fast without feeling rushed. Great pacing.",
  (ctx: ReviewContext) => "Impressed by how quick and efficient everything was. No unnecessary waiting.",
  (ctx: ReviewContext) => "The turnaround was quick but the quality didn't suffer at all.",
]

const PROFESSIONALISM_SENTENCES = [
  (ctx: ReviewContext) => "Extremely professional from start to finish. You can tell they know their stuff.",
  (ctx: ReviewContext) => "The level of expertise here is impressive. They explained everything clearly and delivered exactly what was promised.",
  (ctx: ReviewContext) => "Really knowledgeable team. They took the time to answer all my questions and made me feel confident in their work.",
]

const COMMUNICATION_SENTENCES = [
  (ctx: ReviewContext) => "Communication was excellent throughout. Always responsive and kept me in the loop.",
  (ctx: ReviewContext) => "They were great about keeping me updated every step of the way. No surprises.",
  (ctx: ReviewContext) => "Loved how transparent and communicative they were. That goes a long way.",
]

const RESULTS_SENTENCES = [
  (ctx: ReviewContext) => "The results speak for themselves. Exceeded what I was hoping for.",
  (ctx: ReviewContext) => "Honestly couldn't be happier with the outcome. They really delivered.",
  (ctx: ReviewContext) => "The end result was even better than I expected. Worth every penny.",
]

const POSITIVE_CLOSINGS = [
  (ctx: ReviewContext) => "Already planning my next visit!",
  (ctx: ReviewContext) => "Will definitely be back. Highly recommend.",
  (ctx: ReviewContext) => "Can't wait to come back and try more!",
  (ctx: ReviewContext) => "100% recommend. You won't be disappointed.",
  (ctx: ReviewContext) => "Go here. Thank me later.",
  (ctx: ReviewContext) => `If you're looking for a great ${ctx.category === "restaurant" ? "meal" : "experience"}, this is the place.`,
  (ctx: ReviewContext) => "Already told all my friends about this place.",
  (ctx: ReviewContext) => "This is going to be a regular spot for us now.",
  (ctx: ReviewContext) => "Seriously, don't sleep on this place. Five stars all the way.",
  (ctx: ReviewContext) => "Bookmarked and will be back soon!",
]

const POSITIVE_4STAR_CLOSINGS = [
  (ctx: ReviewContext) => "Would definitely recommend and plan to return.",
  (ctx: ReviewContext) => "Great spot. Will be back for sure.",
  (ctx: ReviewContext) => "Really solid choice. Happy to recommend.",
  (ctx: ReviewContext) => "Looking forward to going back!",
]

// ---- TOPIC SENTENCE MAP ----
const TOPIC_SENTENCE_MAP: Record<string, ((ctx: ReviewContext) => string)[]> = {
  "food quality": FOOD_QUALITY_SENTENCES,
  "service": SERVICE_SENTENCES,
  "ambiance": AMBIANCE_SENTENCES,
  "value": VALUE_SENTENCES,
  "drinks": DRINKS_SENTENCES,
  "speed": SPEED_SENTENCES,
  "professionalism": PROFESSIONALISM_SENTENCES,
  "communication": COMMUNICATION_SENTENCES,
  "results": RESULTS_SENTENCES,
}

// ---- MIXED REVIEW TEMPLATES ----
const MIXED_OPENINGS = [
  (ctx: ReviewContext) => `${ctx.businessName} was a bit of a mixed bag for us.`,
  (ctx: ReviewContext) => `Wanted to love ${ctx.businessName} more than I did. Some things were great, others not so much.`,
  (ctx: ReviewContext) => `Our experience at ${ctx.businessName} was okay - not bad, but not what I'd hoped for.`,
  (ctx: ReviewContext) => `${ctx.businessName} has potential but fell a bit short on this visit.`,
]

const MIXED_FOOD = [
  "The food was decent but nothing that really stood out or made me want to rush back.",
  "Food was fine - properly cooked and reasonably portioned, just nothing memorable.",
  "Some dishes were better than others. Hit and miss overall.",
]

const MIXED_SERVICE = [
  "Service was a bit inconsistent. Started strong but tapered off as it got busy.",
  "Our server was nice enough but seemed overwhelmed. Took a while to get things.",
  "Service was average. Not rude by any means, just not particularly attentive either.",
]

const MIXED_WAIT_TIME = [
  "The wait was longer than expected. Not a dealbreaker but definitely knocked it down a notch.",
  "Had to wait quite a bit, which was frustrating since we had a reservation.",
  "Could improve on the wait times. Everything else was acceptable.",
]

const MIXED_CLOSINGS = [
  "Might give it another shot on a less busy night.",
  "Not bad, but I've had better for the price. Could go either way on a return visit.",
  "Has the bones of a good spot. A few tweaks would make a big difference.",
  "Worth trying but temper your expectations a bit.",
]

// ---- NEGATIVE REVIEW TEMPLATES ----
const NEGATIVE_OPENINGS = [
  (ctx: ReviewContext) => `Really disappointed with our experience at ${ctx.businessName}.`,
  (ctx: ReviewContext) => `I wanted to give ${ctx.businessName} a fair shot, but it fell well short.`,
  (ctx: ReviewContext) => `Unfortunately ${ctx.businessName} was a letdown.`,
  (ctx: ReviewContext) => `Not the experience I was hoping for at ${ctx.businessName}.`,
]

const NEGATIVE_SERVICE = [
  "The service was really lacking. Felt like we were invisible for most of our visit.",
  "Service was poor - inattentive, slow, and seemed disinterested. Really brought the experience down.",
  "Staff seemed overwhelmed and disorganized. We had to ask multiple times for basic things.",
]

const NEGATIVE_WAIT = [
  "The wait was unreasonable. No acknowledgment, no update, just sitting there wondering if they forgot about us.",
  "Waited far too long at every stage - to be seated, to order, to get food, to get the check.",
]

const NEGATIVE_FOOD = [
  "The food was disappointing. For the prices they charge, I expected much better.",
  "Food quality was below average. Didn't taste fresh and portions were small.",
  "Our food came out lukewarm and didn't look anything like what was described on the menu.",
]

const NEGATIVE_CLEANLINESS = [
  "Cleanliness was an issue. Table wasn't properly wiped and the restroom was concerning.",
  "The place could use a deep clean. Not what you want to see at a place that serves food.",
]

const NEGATIVE_CLOSINGS = [
  "Hope they can turn things around because the concept has potential.",
  "Won't be rushing back anytime soon. There are better options in the area.",
  "I'd say give it some time and check back. Right now, it's not quite there.",
  "Sharing this so management hopefully takes notice and makes improvements.",
]

// ============ MAIN GENERATION FUNCTION ============

export function generateReview(input: {
  rawInput: string
  rating: number
  businessName: string
  businessCategory?: string
}): {
  generatedReview: string
  sentiment: string
  topics: string[]
} {
  const { rawInput, rating, businessName, businessCategory } = input
  const topics = detectTopics(rawInput)
  const sentiment = detectSentiment(rating, rawInput)
  const entities = extractEntities(rawInput)
  const category = businessCategory || "restaurant"

  const ctx: ReviewContext = {
    businessName,
    category,
    entities,
    topics,
    rawInput,
    rating,
  }

  let parts: string[] = []

  if (rating >= 4) {
    // ---- POSITIVE ----
    const openings = rating === 5 ? POSITIVE_OPENINGS : POSITIVE_4STAR_OPENINGS
    parts.push(pickRandom(openings)(ctx))

    // Add topic-specific sentences (max 3 to keep it natural)
    const topicSentences: string[] = []
    const relevantTopics = topics.filter(t => t !== "overall experience")

    for (const topic of relevantTopics.slice(0, 3)) {
      const generators = TOPIC_SENTENCE_MAP[topic]
      if (generators) {
        topicSentences.push(pickRandom(generators)(ctx))
      }
    }

    // If no topics detected, generate a general positive line using raw input
    if (topicSentences.length === 0) {
      if (entities.adjectives.length > 0) {
        const adj = pickRandom(entities.adjectives)
        topicSentences.push(`Everything was just ${adj}. From start to finish, really well done.`)
      } else if (rawInput.length > 20) {
        topicSentences.push("Everything came together perfectly. You can tell they care about getting the details right.")
      } else {
        topicSentences.push("Really impressed across the board. Not a single thing I'd change.")
      }
    }

    parts.push(...topicSentences)

    // Add closing
    const closings = rating === 5 ? POSITIVE_CLOSINGS : POSITIVE_4STAR_CLOSINGS
    parts.push(pickRandom(closings)(ctx))
  } else if (rating === 3) {
    // ---- MIXED ----
    parts.push(pickRandom(MIXED_OPENINGS)(ctx))

    if (topics.includes("food quality")) parts.push(pickRandom(MIXED_FOOD))
    if (topics.includes("service")) parts.push(pickRandom(MIXED_SERVICE))
    if (topics.includes("wait time")) parts.push(pickRandom(MIXED_WAIT_TIME))

    if (parts.length === 1) {
      parts.push("Some aspects were fine but others need work.")
    }

    parts.push(pickRandom(MIXED_CLOSINGS))
  } else {
    // ---- NEGATIVE ----
    parts.push(pickRandom(NEGATIVE_OPENINGS)(ctx))

    if (topics.includes("service")) parts.push(pickRandom(NEGATIVE_SERVICE))
    if (topics.includes("wait time")) parts.push(pickRandom(NEGATIVE_WAIT))
    if (topics.includes("food quality")) parts.push(pickRandom(NEGATIVE_FOOD))
    if (topics.includes("cleanliness")) parts.push(pickRandom(NEGATIVE_CLEANLINESS))

    if (parts.length === 1) {
      parts.push("The overall experience just didn't meet the standard you'd expect.")
    }

    parts.push(pickRandom(NEGATIVE_CLOSINGS))
  }

  // Join with natural spacing - sometimes add line breaks for longer reviews
  const generatedReview = parts.join(" ")

  return {
    generatedReview,
    sentiment,
    topics,
  }
}

// ============ RESPONSE GENERATION ============

const RESPONSE_POSITIVE = [
  (ctx: ResponseContext) => `${ctx.greeting}! Thank you so much for the wonderful review! It really means a lot to our team.`,
  (ctx: ResponseContext) => `${ctx.greeting}! Wow, this made our day! Thank you for taking the time to share your experience.`,
  (ctx: ResponseContext) => `${ctx.greeting}! We're so happy to hear this! Reviews like yours are what keep us going.`,
  (ctx: ResponseContext) => `${ctx.greeting}! Thank you for the incredible feedback! We're thrilled you had such a great time.`,
  (ctx: ResponseContext) => `${ctx.greeting}! This is the kind of review that puts a huge smile on our faces. Thank you!`,
]

const RESPONSE_NEUTRAL = [
  (ctx: ResponseContext) => `${ctx.greeting}, thank you for your honest feedback. We truly appreciate you taking the time.`,
  (ctx: ResponseContext) => `${ctx.greeting}, we appreciate your candid review. Your feedback helps us improve.`,
  (ctx: ResponseContext) => `${ctx.greeting}, thanks for sharing your experience with us. We take all feedback seriously.`,
]

const RESPONSE_NEGATIVE = [
  (ctx: ResponseContext) => `${ctx.greeting}, we're sincerely sorry about your experience. This is not the standard we hold ourselves to.`,
  (ctx: ResponseContext) => `${ctx.greeting}, thank you for bringing this to our attention. We're genuinely sorry we fell short.`,
  (ctx: ResponseContext) => `${ctx.greeting}, we owe you an apology. Your experience is not what we strive for, and we want to make it right.`,
]

type ResponseContext = {
  greeting: string
  businessName: string
  topics: string[]
  rating: number
}

const RESPONSE_FOOD_POSITIVE = [
  "We're so glad you enjoyed the food! Our kitchen team puts so much passion into every plate.",
  "Hearing that the food hit the mark makes our chef's day. We're all about quality ingredients and care.",
]

const RESPONSE_SERVICE_POSITIVE = [
  "We'll make sure to share your kind words with our team - they'll be thrilled!",
  "Our staff works hard to create a great experience, and knowing it showed means everything.",
]

const RESPONSE_AMBIANCE_POSITIVE = [
  "We put a lot of thought into creating the right atmosphere, so it's wonderful that you felt it!",
]

const RESPONSE_WAIT_NEGATIVE = [
  "We hear you on the wait time. We've been working on improving our flow and are making changes to ensure this improves.",
  "The wait is something we're actively addressing. We're adding resources during peak hours to cut down on this.",
]

const RESPONSE_SERVICE_NEGATIVE = [
  "We've shared your feedback with our team and are taking steps to ensure everyone receives the attentive service they deserve.",
  "This isn't the level of service we expect from our team. We've addressed this directly and are implementing additional training.",
]

const RESPONSE_FOOD_NEGATIVE = [
  "We hold our food to high standards, and hearing this tells us we need to do better. We've flagged this with our kitchen team.",
  "The food quality you described is not acceptable to us. We're reviewing our processes to make sure this doesn't happen again.",
]

const RESPONSE_CLEANLINESS_NEGATIVE = [
  "Cleanliness is a non-negotiable for us. We've already taken corrective action based on your feedback.",
]

const RESPONSE_CLOSINGS_POSITIVE = [
  (ctx: ResponseContext) => `We can't wait to welcome you back to ${ctx.businessName}!`,
  (ctx: ResponseContext) => `See you next time! We'll have your favorite ready.`,
  (ctx: ResponseContext) => `Looking forward to your next visit. We've got plenty more for you to try!`,
]

const RESPONSE_CLOSINGS_NEGATIVE = [
  (ctx: ResponseContext) => `We'd love the chance to make this right. Please reach out to us directly so we can discuss this further.`,
  (ctx: ResponseContext) => `If you're willing to give us another chance, we'd love to show you what ${ctx.businessName} is really about. Feel free to contact us directly.`,
  (ctx: ResponseContext) => `Your feedback is genuinely helping us improve. We hope you'll consider giving us another opportunity.`,
]

export function generateResponse(input: {
  review: string
  rating: number
  businessName: string
  customerName?: string
}): string {
  const { review, rating, businessName, customerName } = input
  const topics = detectTopics(review)
  const greeting = customerName ? `Hi ${customerName}` : "Hi there"

  const ctx: ResponseContext = { greeting, businessName, topics, rating }

  const parts: string[] = []

  if (rating >= 4) {
    parts.push(pickRandom(RESPONSE_POSITIVE)(ctx))

    if (topics.includes("food quality")) parts.push(pickRandom(RESPONSE_FOOD_POSITIVE))
    if (topics.includes("service")) parts.push(pickRandom(RESPONSE_SERVICE_POSITIVE))
    if (topics.includes("ambiance")) parts.push(pickRandom(RESPONSE_AMBIANCE_POSITIVE))

    parts.push(pickRandom(RESPONSE_CLOSINGS_POSITIVE)(ctx))
  } else if (rating === 3) {
    parts.push(pickRandom(RESPONSE_NEUTRAL)(ctx))

    if (topics.includes("wait time")) parts.push(pickRandom(RESPONSE_WAIT_NEGATIVE))
    if (topics.includes("service")) parts.push(pickRandom(RESPONSE_SERVICE_NEGATIVE))

    parts.push(`We'd love the chance to give you a better experience next time at ${businessName}. Please don't hesitate to reach out to us directly!`)
  } else {
    parts.push(pickRandom(RESPONSE_NEGATIVE)(ctx))

    if (topics.includes("wait time")) parts.push(pickRandom(RESPONSE_WAIT_NEGATIVE))
    if (topics.includes("service")) parts.push(pickRandom(RESPONSE_SERVICE_NEGATIVE))
    if (topics.includes("food quality")) parts.push(pickRandom(RESPONSE_FOOD_NEGATIVE))
    if (topics.includes("cleanliness")) parts.push(pickRandom(RESPONSE_CLEANLINESS_NEGATIVE))

    parts.push(pickRandom(RESPONSE_CLOSINGS_NEGATIVE)(ctx))
  }

  return parts.join(" ")
}

export { detectTopics, detectSentiment, extractEntities }
