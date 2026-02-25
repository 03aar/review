// AI Transformation Engine
// Generates polished, human-sounding reviews and contextual responses
// Uses pattern-based generation with high variance to avoid template fatigue

// ============ HELPERS ============

/** Check if a word/phrase appears with word boundaries (prevents "tea" matching "steak") */
function hasWord(text: string, word: string): boolean {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`\\b${escaped}\\b`, "i").test(text)
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ============ ENTITY EXTRACTION ============

interface ExtractedEntities {
  people: string[]     // "Sarah", "Marco", "the waiter"
  dishes: string[]     // "carbonara", "the steak", "pasta"
  drinks: string[]     // "margarita", "wine", "coffee"
  adjectives: string[] // "amazing", "terrible", "quick"
  places: string[]     // "patio", "bar area", "upstairs"
  specifics: string[]  // anything unique from the input
}

// Words that look like names but aren't (sentence-initial caps, common words)
const NAME_EXCLUSIONS = new Set([
  "The", "Our", "My", "Her", "His", "Their", "This", "That", "Very",
  "Still", "Every", "Just", "Some", "Most", "Each", "What", "When",
  "Where", "Who", "How", "But", "And", "Not", "Now", "Well", "Here",
  "There", "They", "Then", "Than", "Have", "Been", "Were", "Will",
  "Would", "Could", "Should", "Also", "Really", "Even", "Much",
  "Many", "Such", "Like", "Made", "Came", "Went", "Got", "Did",
  "Had", "Was", "Are", "Can", "May", "All", "Too", "One", "Two",
  "First", "Last", "Next", "Best", "Good", "Great", "Nice", "Fine",
  "Food", "Place", "Service", "Staff", "Menu", "Table", "Room",
  "Everything", "Nothing", "Something", "Anything", "Overall",
  "Definitely", "Absolutely", "Honestly", "Seriously", "Highly",
  "After", "Before", "During", "Since", "While", "Until",
  "Never", "Always", "Usually", "Sometimes", "Today", "Yesterday",
])

const ADJECTIVE_EXCLUSIONS = new Set([
  "that", "this", "then", "them", "they", "what", "when", "just",
  "also", "been", "like", "here", "there", "some", "much", "well",
  "only", "still", "even", "more", "most", "with", "from", "about",
  "into", "over", "such", "each", "both", "same", "made", "done",
  "going", "being", "having", "getting", "able", "okay", "quite",
  "really", "very", "sure", "back", "down", "open", "full", "long",
  "late", "early", "told", "said", "came", "went", "took", "gave",
])

function extractEntities(input: string): ExtractedEntities {
  const entities: ExtractedEntities = {
    people: [],
    dishes: [],
    drinks: [],
    adjectives: [],
    places: [],
    specifics: [],
  }

  // Extract proper names (capitalized words after role indicators)
  const namePattern = /\b(?:with|by|named|called|our|server|waiter|waitress|bartender|chef|doctor|dr|nurse|hygienist|technician|stylist|barber)\s+([A-Z][a-z]+)/gi
  let match
  while ((match = namePattern.exec(input)) !== null) {
    if (!NAME_EXCLUSIONS.has(match[1])) {
      entities.people.push(match[1])
    }
  }

  // Standalone capitalized names before verbs
  const standaloneNames = input.match(/(?:^|\.\s+)([A-Z][a-z]{2,})\s+(?:was|is|helped|made|took|brought)/g)
  if (standaloneNames) {
    standaloneNames.forEach(m => {
      const name = m.replace(/^[\.\s]+/, "").split(/\s/)[0]
      if (!NAME_EXCLUSIONS.has(name)) {
        entities.people.push(name)
      }
    })
  }

  // Food items — word boundary prevents "tea" matching "steak", "pie" matching "piece"
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
    if (hasWord(input, f)) entities.dishes.push(f)
  })

  // Drink items
  const drinkWords = [
    "wine", "beer", "cocktail", "margarita", "martini", "mojito",
    "coffee", "espresso", "latte", "cappuccino", "tea", "matcha",
    "sangria", "mimosa", "champagne", "prosecco", "bourbon", "whiskey",
    "old fashioned", "old-fashioned", "negroni", "daiquiri", "cosmopolitan",
  ]
  drinkWords.forEach(d => {
    if (hasWord(input, d)) entities.drinks.push(d)
  })

  // Place references
  const placeWords = [
    "patio", "terrace", "rooftop", "bar", "counter", "booth", "window",
    "upstairs", "downstairs", "garden", "lounge", "deck", "balcony",
    "outdoor", "inside", "fireplace", "corner", "private room",
  ]
  placeWords.forEach(p => {
    if (hasWord(input, p)) entities.places.push(p)
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
      if (word.length > 3 && !ADJECTIVE_EXCLUSIONS.has(word)) {
        entities.adjectives.push(word)
      }
    }
  })

  // Extract specific phrases (after "especially", "loved the", etc.)
  const specificPatterns = [
    /(?:loved|liked|enjoyed|tried|had|got|ordered)\s+(?:the\s+)?(.{3,30}?)(?:\.|,|!|\band\b)/gi,
    /(?:especially|particularly)\s+(?:the\s+)?(.{3,30}?)(?:\.|,|!)/gi,
  ]
  specificPatterns.forEach(pat => {
    pat.lastIndex = 0 // Reset to ensure clean execution
    let m
    while ((m = pat.exec(input)) !== null) {
      entities.specifics.push(m[1].trim())
    }
  })

  return entities
}

// ============ TOPIC DETECTION ============

const TOPIC_KEYWORDS: Record<string, string[]> = {
  "food quality": ["food", "meal", "dish", "taste", "flavor", "delicious", "fresh", "cook", "cooked", "chef", "menu", "portion", "ingredient", "seasoning", "plate", "presentation"],
  "service": ["service", "waiter", "waitress", "server", "staff", "friendly", "attentive", "helpful", "rude", "slow", "host", "hostess", "greeted", "seated"],
  "ambiance": ["ambiance", "atmosphere", "decor", "vibe", "cozy", "loud", "noise", "music", "lighting", "aesthetic", "beautiful", "romantic", "intimate"],
  "value": ["price", "value", "expensive", "cheap", "affordable", "worth", "cost", "money", "overpriced", "reasonable", "deal", "bang for"],
  "wait time": ["waited", "long wait", "slow", "quick", "minutes", "hour", "reservation", "took forever", "wait time", "on time"],
  "cleanliness": ["clean", "dirty", "hygiene", "spotless", "messy", "tidy", "bathroom", "restroom", "sanitary", "cleaner"],
  "location": ["location", "parking", "accessible", "convenient", "neighborhood", "find", "drive", "walk"],
  "drinks": ["cocktail", "wine", "beer", "coffee", "tea", "beverage", "bar", "bartender", "mixology", "drink"],
  "dessert": ["dessert", "sweet", "cake", "pie", "ice cream", "chocolate", "pastry", "tiramisu"],
  "professionalism": ["professional", "expertise", "knowledge", "experienced", "skilled", "competent", "thorough", "detailed"],
  "communication": ["communication", "responsive", "called back", "update", "informed", "explained", "transparent"],
  "results": ["results", "outcome", "fixed", "solved", "resolved", "exceeded", "perfect result"],
  "comfort": ["comfortable", "relaxed", "at ease", "welcoming", "warm", "inviting"],
  "speed": ["fast", "quick", "efficient", "prompt", "timely", "speedy"],
}

function detectTopics(input: string): string[] {
  const detected: string[] = []

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (keywords.some(kw => hasWord(input, kw))) {
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

  const posCount = positiveWords.filter(w => hasWord(input, w)).length
  const negCount = negativeWords.filter(w => hasWord(input, w)).length

  if (posCount > negCount) return "positive"
  if (negCount > posCount) return "negative"
  return "neutral"
}

// ============ CATEGORY SYSTEM ============

type BusinessCategoryType = "restaurant" | "retail" | "healthcare" | "salon" | "automotive" | "services" | "general"

interface CategoryNouns {
  spot: string       // "spot" / "shop" / "practice"
  experience: string // "meal" / "visit" / "appointment"
  offering: string   // "menu" / "selection" / "care"
  team: string       // "staff" / "team"
}

function normalizeCategory(category: string): BusinessCategoryType {
  // Use includes() for prefix/substring matching against business-owner-set category strings.
  // Order matters: more specific categories (healthcare, salon, automotive) before generic ones (retail).
  const lower = category.toLowerCase()
  const matchers: [string[], BusinessCategoryType][] = [
    [["restaurant", "cafe", "bakery", "food", "dining", "bistro", "pizzeria", "grill", "diner", "brewery", "coffee shop", "eatery", "pub", "tavern", "sushi"], "restaurant"],
    [["health", "medical", "dental", "clinic", "doctor", "hospital", "therapy", "chiropractic", "optometry", "pharmacy", "veterinar", "vet clinic"], "healthcare"],
    [["salon", "spa", "barber", "beauty", "nail", "hair", "wax", "massage", "tattoo"], "salon"],
    [["auto", "car ", "mechanic", "tire", "body shop", "detailing", "oil change"], "automotive"],
    [["retail", "store", "boutique", "market", "grocery", "hardware"], "retail"],
    [["law", "legal", "accounting", "financial", "insurance", "real estate", "consulting", "plumb", "electric", "hvac", "cleaning", "landscap", "roofing", "construction", "moving", "pest", "repair", "photography", "wedding", "event", "gym", "fitness"], "services"],
  ]
  for (const [keywords, cat] of matchers) {
    if (keywords.some(kw => lower.includes(kw))) return cat
  }
  // Final check: "bar" and "shop" are ambiguous — check with word boundary as last resort
  if (hasWord(category, "bar")) return "restaurant"
  if (hasWord(category, "shop")) return "retail"
  return "general"
}

function getCategoryNouns(cat: BusinessCategoryType): CategoryNouns {
  switch (cat) {
    case "restaurant": return { spot: "spot", experience: "meal", offering: "menu", team: "staff" }
    case "retail": return { spot: "shop", experience: "shopping experience", offering: "selection", team: "staff" }
    case "healthcare": return { spot: "practice", experience: "visit", offering: "care", team: "team" }
    case "salon": return { spot: "salon", experience: "appointment", offering: "services", team: "team" }
    case "automotive": return { spot: "shop", experience: "service", offering: "work", team: "team" }
    case "services": return { spot: "company", experience: "experience", offering: "work", team: "team" }
    default: return { spot: "place", experience: "experience", offering: "services", team: "team" }
  }
}

function capitalizeTeam(nouns: CategoryNouns): string {
  return nouns.team.charAt(0).toUpperCase() + nouns.team.slice(1)
}

// ============ REVIEW GENERATION ============

type ReviewContext = {
  businessName: string
  category: BusinessCategoryType
  nouns: CategoryNouns
  entities: ExtractedEntities
  topics: string[]
  rawInput: string
  rating: number
  inputLength: "short" | "medium" | "long"
}

// Typed template function aliases — ensures () => string is assignable to (ctx) => string
type ReviewFn = (ctx: ReviewContext) => string
type ResponseFn = (ctx: ResponseContext) => string

function getInputLength(input: string): "short" | "medium" | "long" {
  if (input.length < 30) return "short"
  if (input.length < 100) return "medium"
  return "long"
}

// ---- SHORT REVIEWS (proportional to minimal input) ----

const SHORT_POSITIVE: ReviewFn[] = [
  (ctx) => `${ctx.businessName} was great! Solid ${ctx.nouns.experience}, would definitely recommend.`,
  (ctx) => `Really enjoyed ${ctx.businessName}. Will be back for sure.`,
  (ctx) => `Great ${ctx.nouns.experience} at ${ctx.businessName}. Highly recommend!`,
  (ctx) => `${ctx.businessName} delivered. Good ${ctx.nouns.experience} all around.`,
  (ctx) => `Happy with our visit to ${ctx.businessName}. Would go back!`,
]

const SHORT_MIXED: ReviewFn[] = [
  (ctx) => `${ctx.businessName} was okay. Nothing special but not bad either. Might try again.`,
  (ctx) => `Decent ${ctx.nouns.experience} at ${ctx.businessName}. Some room for improvement.`,
  (ctx) => `${ctx.businessName} was fine. Has potential but didn't quite wow me.`,
]

const SHORT_NEGATIVE: ReviewFn[] = [
  (ctx) => `Disappointed with ${ctx.businessName}. Didn't meet expectations.`,
  (ctx) => `Not a great ${ctx.nouns.experience} at ${ctx.businessName}. Hope they improve.`,
  (ctx) => `${ctx.businessName} fell short. Can't recommend based on this visit.`,
]

// ---- POSITIVE REVIEW TEMPLATES ----

const POSITIVE_OPENINGS: ReviewFn[] = [
  (ctx) => `Finally tried ${ctx.businessName} and wow, I've been missing out!`,
  (ctx) => `Just had the best ${ctx.nouns.experience} at ${ctx.businessName}. Seriously impressed.`,
  (ctx) => `${ctx.businessName} was even better than I'd hoped. So glad we came here.`,
  (ctx) => `Can't say enough good things about ${ctx.businessName}.`,
  (ctx) => `This was my first time at ${ctx.businessName} and it definitely won't be my last.`,
  (ctx) => `${ctx.businessName} is the real deal. Not overhyped at all.`,
  (ctx) => `I'm honestly shocked more people don't know about ${ctx.businessName}.`,
  (ctx) => `Went to ${ctx.businessName} and I'm still thinking about it.`,
  (ctx) => `If you haven't tried ${ctx.businessName} yet, you're seriously missing out.`,
  (ctx) => `We've been looking for a good ${ctx.nouns.spot} and ${ctx.businessName} nailed it.`,
  (ctx) => `${ctx.businessName} just became my new go-to. What a find!`,
  (ctx) => `Had the pleasure of visiting ${ctx.businessName} recently and it did not disappoint.`,
]

const POSITIVE_4STAR_OPENINGS: ReviewFn[] = [
  (ctx) => `Really enjoyed our time at ${ctx.businessName}.`,
  (ctx) => `${ctx.businessName} was great. Solid ${ctx.nouns.experience} overall.`,
  (ctx) => `Had a really good ${ctx.nouns.experience} at ${ctx.businessName}. Would definitely go back.`,
  (ctx) => `${ctx.businessName} is a great choice. Came in with high expectations and they delivered.`,
  (ctx) => `We had a lovely time at ${ctx.businessName}. Very happy we tried it.`,
]

// Topic-specific sentence generators
const FOOD_QUALITY_SENTENCES: ReviewFn[] = [
  (ctx) => {
    if (ctx.entities.dishes.length > 0) {
      const dish = pickRandom(ctx.entities.dishes)
      return `The ${dish} was incredible - easily one of the best I've ever had.`
    }
    return "The food was on another level. Every bite was perfectly executed."
  },
  (ctx) => {
    if (ctx.entities.dishes.length > 0) {
      const dish = pickRandom(ctx.entities.dishes)
      return `Got the ${dish} and it was absolutely phenomenal. You can taste the quality.`
    }
    return "You can tell they use real, quality ingredients here. Everything tasted fresh and homemade."
  },
  (ctx) => {
    if (ctx.entities.dishes.length >= 2) {
      return `We tried the ${ctx.entities.dishes[0]} and the ${ctx.entities.dishes[1]} - both were outstanding.`
    }
    return "The food here is genuinely impressive. Not just good-for-the-price good, but actually great."
  },
  () => "Everything we ordered was delicious. Not a single miss on the table.",
  () => "The flavors were incredible and the presentation was beautiful. They clearly care about what they put out.",
  (ctx) => {
    if (ctx.entities.dishes.length > 0) {
      return `The ${pickRandom(ctx.entities.dishes)} alone is worth the trip. Trust me on this one.`
    }
    return "The menu is well thought out and everything we tried was a hit."
  },
]

const SERVICE_SENTENCES: ReviewFn[] = [
  (ctx) => {
    if (ctx.entities.people.length > 0) {
      const person = pickRandom(ctx.entities.people)
      return `${person} took care of us and made the whole ${ctx.nouns.experience} so much better. Friendly, attentive, and genuinely great at their job.`
    }
    return `The ${ctx.nouns.team} were fantastic - friendly and attentive without hovering. Perfect balance.`
  },
  (ctx) => {
    if (ctx.entities.people.length > 0) {
      const person = pickRandom(ctx.entities.people)
      return `Shoutout to ${person} who took amazing care of us. Made great recommendations too.`
    }
    return `${capitalizeTeam(ctx.nouns)} was outstanding from the moment we walked in. Everyone was so welcoming.`
  },
  (ctx) => `The ${ctx.nouns.team} here clearly loves what they do. You can feel it in how they treat you.`,
  () => "We were greeted warmly and the service stayed consistently great throughout our visit.",
  (ctx) => {
    if (ctx.entities.people.length > 0) {
      return `${pickRandom(ctx.entities.people)} really took care of us. That kind of service is rare.`
    }
    return "Genuinely great service. They remembered our preferences and anticipated what we needed."
  },
]

const AMBIANCE_SENTENCES: ReviewFn[] = [
  (ctx) => {
    if (ctx.entities.places.length > 0) {
      return `The ${pickRandom(ctx.entities.places)} area is gorgeous. Such a great vibe.`
    }
    return "The ambiance is just right - cozy and inviting without trying too hard."
  },
  () => "Love the atmosphere here. It's got that perfect mix of casual and classy.",
  () => "The decor and lighting create such a nice mood. Great for a date night or catching up with friends.",
  () => "Beautiful space with a really warm, welcoming feel. You want to linger.",
]

const VALUE_SENTENCES: ReviewFn[] = [
  () => "Honestly great value for what you get. The quality-to-price ratio is excellent.",
  () => "Very fairly priced for the quality. You're getting way more than you'd expect.",
  () => "Not the cheapest option out there, but absolutely worth every penny.",
  () => "Incredible value. I've paid twice as much elsewhere for half the quality.",
]

const DRINKS_SENTENCES: ReviewFn[] = [
  (ctx) => {
    if (ctx.entities.drinks.length > 0) {
      return `The ${pickRandom(ctx.entities.drinks)} was perfectly made. Their drink game is strong.`
    }
    return "The drinks were excellent. Clearly someone behind the bar knows what they're doing."
  },
  () => "Great drink selection and everything was well-crafted. Not your standard fare.",
  (ctx) => {
    if (ctx.entities.drinks.length > 0) {
      return `Tried the ${pickRandom(ctx.entities.drinks)} and it was spot-on. Will be ordering that again.`
    }
    return "The bar program here is legit. Creative cocktails that actually taste good."
  },
]

const SPEED_SENTENCES: ReviewFn[] = [
  () => "Everything came out fast without feeling rushed. Great pacing.",
  () => "Impressed by how quick and efficient everything was. No unnecessary waiting.",
  () => "The turnaround was quick but the quality didn't suffer at all.",
]

const PROFESSIONALISM_SENTENCES: ReviewFn[] = [
  () => "Extremely professional from start to finish. You can tell they know their stuff.",
  () => "The level of expertise here is impressive. They explained everything clearly and delivered exactly what was promised.",
  () => "Really knowledgeable team. They took the time to answer all my questions and made me feel confident in their work.",
]

const COMMUNICATION_SENTENCES: ReviewFn[] = [
  () => "Communication was excellent throughout. Always responsive and kept me in the loop.",
  () => "They were great about keeping me updated every step of the way. No surprises.",
  () => "Loved how transparent and communicative they were. That goes a long way.",
]

const RESULTS_SENTENCES: ReviewFn[] = [
  () => "The results speak for themselves. Exceeded what I was hoping for.",
  () => "Honestly couldn't be happier with the outcome. They really delivered.",
  () => "The end result was even better than I expected. Worth every penny.",
]

const POSITIVE_CLOSINGS: ReviewFn[] = [
  () => "Already planning my next visit!",
  () => "Will definitely be back. Highly recommend.",
  () => "Can't wait to come back and try more!",
  () => "100% recommend. You won't be disappointed.",
  () => "Go here. Thank me later.",
  (ctx) => `If you're looking for a great ${ctx.nouns.experience}, this is the place.`,
  () => "Already told all my friends about this place.",
  () => "This is going to be a regular spot for us now.",
  () => "Seriously, don't sleep on this place. Five stars all the way.",
  () => "Bookmarked and will be back soon!",
]

const POSITIVE_4STAR_CLOSINGS: ReviewFn[] = [
  () => "Would definitely recommend and plan to return.",
  () => "Great spot. Will be back for sure.",
  () => "Really solid choice. Happy to recommend.",
  () => "Looking forward to going back!",
]

// ---- TOPIC SENTENCE MAP ----
const TOPIC_SENTENCE_MAP: Record<string, ReviewFn[]> = {
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

// ---- MIXED REVIEW TEMPLATES (3 star) ----

const MIXED_OPENINGS: ReviewFn[] = [
  (ctx) => `${ctx.businessName} was a bit of a mixed bag for us.`,
  (ctx) => `Wanted to love ${ctx.businessName} more than I did. Some things were great, others not so much.`,
  (ctx) => `Our ${ctx.nouns.experience} at ${ctx.businessName} was okay - not bad, but not what I'd hoped for.`,
  (ctx) => `${ctx.businessName} has potential but fell a bit short on this visit.`,
]

const MIXED_FOOD: ReviewFn[] = [
  (ctx) => {
    if (ctx.entities.dishes.length > 0) {
      const dish = pickRandom(ctx.entities.dishes)
      return `The ${dish} was decent but nothing that really stood out.`
    }
    return "The food was decent but nothing that really stood out or made me want to rush back."
  },
  (ctx) => {
    if (ctx.entities.dishes.length >= 2) {
      return `The ${ctx.entities.dishes[0]} was okay but the ${ctx.entities.dishes[1]} was underwhelming.`
    }
    return "Food was fine - properly cooked and reasonably portioned, just nothing memorable."
  },
  () => "Some dishes were better than others. Hit and miss overall.",
]

const MIXED_SERVICE: ReviewFn[] = [
  (ctx) => {
    if (ctx.entities.people.length > 0) {
      return `${pickRandom(ctx.entities.people)} was nice but things slowed down as it got busier.`
    }
    return "Service was a bit inconsistent. Started strong but tapered off as it got busy."
  },
  () => "Our server was nice enough but seemed overwhelmed. Took a while to get things.",
  (ctx) => `${capitalizeTeam(ctx.nouns)} was average. Not rude by any means, just not particularly attentive either.`,
]

const MIXED_WAIT_TIME: ReviewFn[] = [
  () => "The wait was longer than expected. Not a dealbreaker but definitely knocked it down a notch.",
  () => "Had to wait quite a bit, which was frustrating since we had a reservation.",
  () => "Could improve on the wait times. Everything else was acceptable.",
]

const MIXED_CLOSINGS: ReviewFn[] = [
  () => "Might give it another shot on a less busy night.",
  () => "Not bad, but I've had better for the price. Could go either way on a return visit.",
  () => "Has the bones of a good spot. A few tweaks would make a big difference.",
  () => "Worth trying but temper your expectations a bit.",
]

// ---- NEGATIVE REVIEW TEMPLATES (1-2 star) ----

const NEGATIVE_OPENINGS: ReviewFn[] = [
  (ctx) => `Really disappointed with our ${ctx.nouns.experience} at ${ctx.businessName}.`,
  (ctx) => `I wanted to give ${ctx.businessName} a fair shot, but it fell well short.`,
  (ctx) => `Unfortunately ${ctx.businessName} was a letdown.`,
  (ctx) => `Not the ${ctx.nouns.experience} I was hoping for at ${ctx.businessName}.`,
]

const NEGATIVE_SERVICE: ReviewFn[] = [
  (ctx) => {
    if (ctx.entities.people.length > 0) {
      return `${pickRandom(ctx.entities.people)} seemed disinterested and we had to ask for basic things multiple times.`
    }
    return "The service was really lacking. Felt like we were invisible for most of our visit."
  },
  () => "Service was poor - inattentive, slow, and seemed disinterested. Really brought the experience down.",
  (ctx) => `${capitalizeTeam(ctx.nouns)} seemed overwhelmed and disorganized. We had to ask multiple times for basic things.`,
]

const NEGATIVE_WAIT: ReviewFn[] = [
  () => "The wait was unreasonable. No acknowledgment, no update, just sitting there wondering if they forgot about us.",
  () => "Waited far too long at every stage. The whole thing felt disorganized.",
]

const NEGATIVE_FOOD: ReviewFn[] = [
  (ctx) => {
    if (ctx.entities.dishes.length > 0) {
      const dish = pickRandom(ctx.entities.dishes)
      return `The ${dish} was disappointing. For the prices they charge, I expected much better.`
    }
    return "The food was disappointing. For the prices they charge, I expected much better."
  },
  () => "Food quality was below average. Didn't taste fresh and portions were small.",
  () => "Our food came out lukewarm and didn't look anything like what was described on the menu.",
]

const NEGATIVE_CLEANLINESS: ReviewFn[] = [
  () => "Cleanliness was an issue. Table wasn't properly wiped and the restroom was concerning.",
  () => "The place could use a deep clean. Not what you want to see.",
]

const NEGATIVE_CLOSINGS: ReviewFn[] = [
  () => "Hope they can turn things around because the concept has potential.",
  () => "Won't be rushing back anytime soon. There are better options in the area.",
  () => "I'd say give it some time and check back. Right now, it's not quite there.",
  () => "Sharing this so management hopefully takes notice and makes improvements.",
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
  const category = normalizeCategory(businessCategory || "restaurant")
  const nouns = getCategoryNouns(category)
  const inputLength = getInputLength(rawInput)

  const ctx: ReviewContext = {
    businessName,
    category,
    nouns,
    entities,
    topics,
    rawInput,
    rating,
    inputLength,
  }

  const parts: string[] = []

  if (rating >= 4) {
    // ---- POSITIVE ----
    if (inputLength === "short") {
      parts.push(pickRandom(SHORT_POSITIVE)(ctx))
    } else {
      const openings = rating === 5 ? POSITIVE_OPENINGS : POSITIVE_4STAR_OPENINGS
      parts.push(pickRandom(openings)(ctx))

      // Topic sentences — scale count to input length
      const maxTopics = inputLength === "medium" ? 1 : 3
      const topicSentences: string[] = []
      const relevantTopics = topics.filter(t => t !== "overall experience")

      for (const topic of relevantTopics.slice(0, maxTopics)) {
        const generators = TOPIC_SENTENCE_MAP[topic]
        if (generators) {
          topicSentences.push(pickRandom(generators)(ctx))
        }
      }

      // No topics detected — generate a general positive line
      if (topicSentences.length === 0) {
        if (entities.adjectives.length > 0) {
          const adj = pickRandom(entities.adjectives)
          topicSentences.push(`Everything was just ${adj}. From start to finish, really well done.`)
        } else {
          topicSentences.push("Everything came together perfectly. You can tell they care about getting the details right.")
        }
      }

      parts.push(...topicSentences)

      const closings = rating === 5 ? POSITIVE_CLOSINGS : POSITIVE_4STAR_CLOSINGS
      parts.push(pickRandom(closings)(ctx))
    }
  } else if (rating === 3) {
    // ---- MIXED ----
    if (inputLength === "short") {
      parts.push(pickRandom(SHORT_MIXED)(ctx))
    } else {
      parts.push(pickRandom(MIXED_OPENINGS)(ctx))

      const maxTopics = inputLength === "medium" ? 1 : 2
      let topicCount = 0

      if (topics.includes("food quality") && topicCount < maxTopics) {
        parts.push(pickRandom(MIXED_FOOD)(ctx))
        topicCount++
      }
      if (topics.includes("service") && topicCount < maxTopics) {
        parts.push(pickRandom(MIXED_SERVICE)(ctx))
        topicCount++
      }
      if (topics.includes("wait time") && topicCount < maxTopics) {
        parts.push(pickRandom(MIXED_WAIT_TIME)(ctx))
        topicCount++
      }

      if (topicCount === 0) {
        parts.push("Some aspects were fine but others need work.")
      }

      parts.push(pickRandom(MIXED_CLOSINGS)(ctx))
    }
  } else {
    // ---- NEGATIVE ----
    if (inputLength === "short") {
      parts.push(pickRandom(SHORT_NEGATIVE)(ctx))
    } else {
      parts.push(pickRandom(NEGATIVE_OPENINGS)(ctx))

      const maxTopics = inputLength === "medium" ? 1 : 3
      let topicCount = 0

      if (topics.includes("service") && topicCount < maxTopics) {
        parts.push(pickRandom(NEGATIVE_SERVICE)(ctx))
        topicCount++
      }
      if (topics.includes("wait time") && topicCount < maxTopics) {
        parts.push(pickRandom(NEGATIVE_WAIT)(ctx))
        topicCount++
      }
      if (topics.includes("food quality") && topicCount < maxTopics) {
        parts.push(pickRandom(NEGATIVE_FOOD)(ctx))
        topicCount++
      }
      if (topics.includes("cleanliness") && topicCount < maxTopics) {
        parts.push(pickRandom(NEGATIVE_CLEANLINESS)(ctx))
        topicCount++
      }

      if (topicCount === 0) {
        parts.push("The overall experience just didn't meet the standard you'd expect.")
      }

      parts.push(pickRandom(NEGATIVE_CLOSINGS)(ctx))
    }
  }

  const rawReview = parts.join(" ")
  const generatedReview = cleanupText(rawReview)

  return { generatedReview, sentiment, topics }
}

// ============ RESPONSE GENERATION ============

type ResponseContext = {
  greeting: string
  businessName: string
  nouns: CategoryNouns
  topics: string[]
  rating: number
  entities: ExtractedEntities
}

const RESPONSE_POSITIVE: ResponseFn[] = [
  (ctx) => `${ctx.greeting}! Thank you so much for the wonderful review! It really means a lot to our ${ctx.nouns.team}.`,
  (ctx) => `${ctx.greeting}! Wow, this made our day! Thank you for taking the time to share your experience.`,
  (ctx) => `${ctx.greeting}! We're so happy to hear this! Reviews like yours are what keep us going.`,
  (ctx) => `${ctx.greeting}! Thank you for the incredible feedback! We're thrilled you had such a great ${ctx.nouns.experience}.`,
  (ctx) => `${ctx.greeting}! This is the kind of review that puts a huge smile on our faces. Thank you!`,
]

const RESPONSE_NEUTRAL: ResponseFn[] = [
  (ctx) => `${ctx.greeting}, thank you for your honest feedback. We truly appreciate you taking the time.`,
  (ctx) => `${ctx.greeting}, we appreciate your candid review. Your feedback helps us improve.`,
  (ctx) => `${ctx.greeting}, thanks for sharing your experience with us. We take all feedback seriously.`,
]

const RESPONSE_NEGATIVE: ResponseFn[] = [
  (ctx) => `${ctx.greeting}, we're sincerely sorry about your experience. This is not the standard we hold ourselves to.`,
  (ctx) => `${ctx.greeting}, thank you for bringing this to our attention. We're genuinely sorry we fell short.`,
  (ctx) => `${ctx.greeting}, we owe you an apology. Your experience is not what we strive for, and we want to make it right.`,
]

const RESPONSE_FOOD_POSITIVE: ResponseFn[] = [
  (ctx) => {
    if (ctx.entities.dishes.length > 0) {
      return `So glad you enjoyed the ${pickRandom(ctx.entities.dishes)}! Our kitchen team puts so much passion into every plate.`
    }
    return "We're so glad you enjoyed the food! Our kitchen team puts so much passion into every plate."
  },
  () => "Hearing that the food hit the mark makes our chef's day. We're all about quality ingredients and care.",
]

const RESPONSE_SERVICE_POSITIVE: ResponseFn[] = [
  (ctx) => {
    if (ctx.entities.people.length > 0) {
      return `We'll make sure ${pickRandom(ctx.entities.people)} sees your kind words - they'll be thrilled!`
    }
    return "We'll make sure to share your kind words with our team - they'll be thrilled!"
  },
  (ctx) => `Our ${ctx.nouns.team} works hard to create a great experience, and knowing it showed means everything.`,
]

const RESPONSE_AMBIANCE_POSITIVE: ResponseFn[] = [
  () => "We put a lot of thought into creating the right atmosphere, so it's wonderful that you felt it!",
]

const RESPONSE_WAIT_NEGATIVE: ResponseFn[] = [
  () => "We hear you on the wait time. We've been working on improving our flow and are making changes to ensure this improves.",
  () => "The wait is something we're actively addressing. We're adding resources during peak hours to cut down on this.",
]

const RESPONSE_SERVICE_NEGATIVE: ResponseFn[] = [
  (ctx) => `We've shared your feedback with our ${ctx.nouns.team} and are taking steps to ensure everyone receives the attentive service they deserve.`,
  (ctx) => `This isn't the level of service we expect from our ${ctx.nouns.team}. We've addressed this directly and are implementing additional training.`,
]

const RESPONSE_FOOD_NEGATIVE: ResponseFn[] = [
  () => "We hold our food to high standards, and hearing this tells us we need to do better. We've flagged this with our kitchen team.",
  () => "The food quality you described is not acceptable to us. We're reviewing our processes to make sure this doesn't happen again.",
]

const RESPONSE_CLEANLINESS_NEGATIVE: ResponseFn[] = [
  () => "Cleanliness is a non-negotiable for us. We've already taken corrective action based on your feedback.",
]

const RESPONSE_CLOSINGS_POSITIVE: ResponseFn[] = [
  (ctx) => `We can't wait to welcome you back to ${ctx.businessName}!`,
  () => "See you next time!",
  (ctx) => `Looking forward to your next visit. We've got plenty more for you to try!`,
]

const RESPONSE_CLOSINGS_NEGATIVE: ResponseFn[] = [
  () => "We'd love the chance to make this right. Please reach out to us directly so we can discuss this further.",
  (ctx) => `If you're willing to give us another chance, we'd love to show you what ${ctx.businessName} is really about. Feel free to contact us directly.`,
  () => "Your feedback is genuinely helping us improve. We hope you'll consider giving us another opportunity.",
]

export function generateResponse(input: {
  review: string
  rating: number
  businessName: string
  customerName?: string
  businessCategory?: string
}): string {
  const { review, rating, businessName, customerName, businessCategory } = input
  const topics = detectTopics(review)
  const entities = extractEntities(review)
  const greeting = customerName ? `Hi ${customerName}` : "Hi there"
  const category = normalizeCategory(businessCategory || "restaurant")
  const nouns = getCategoryNouns(category)

  const ctx: ResponseContext = { greeting, businessName, nouns, topics, rating, entities }

  const parts: string[] = []

  if (rating >= 4) {
    parts.push(pickRandom(RESPONSE_POSITIVE)(ctx))

    if (topics.includes("food quality")) parts.push(pickRandom(RESPONSE_FOOD_POSITIVE)(ctx))
    if (topics.includes("service")) parts.push(pickRandom(RESPONSE_SERVICE_POSITIVE)(ctx))
    if (topics.includes("ambiance")) parts.push(pickRandom(RESPONSE_AMBIANCE_POSITIVE)(ctx))

    parts.push(pickRandom(RESPONSE_CLOSINGS_POSITIVE)(ctx))
  } else if (rating === 3) {
    parts.push(pickRandom(RESPONSE_NEUTRAL)(ctx))

    if (topics.includes("wait time")) parts.push(pickRandom(RESPONSE_WAIT_NEGATIVE)(ctx))
    if (topics.includes("service")) parts.push(pickRandom(RESPONSE_SERVICE_NEGATIVE)(ctx))

    parts.push(`We'd love the chance to give you a better ${nouns.experience} next time at ${businessName}. Please don't hesitate to reach out to us directly!`)
  } else {
    parts.push(pickRandom(RESPONSE_NEGATIVE)(ctx))

    if (topics.includes("wait time")) parts.push(pickRandom(RESPONSE_WAIT_NEGATIVE)(ctx))
    if (topics.includes("service")) parts.push(pickRandom(RESPONSE_SERVICE_NEGATIVE)(ctx))
    if (topics.includes("food quality")) parts.push(pickRandom(RESPONSE_FOOD_NEGATIVE)(ctx))
    if (topics.includes("cleanliness")) parts.push(pickRandom(RESPONSE_CLEANLINESS_NEGATIVE)(ctx))

    parts.push(pickRandom(RESPONSE_CLOSINGS_NEGATIVE)(ctx))
  }

  return cleanupText(parts.join(" "))
}

// ============ TEXT CLEANUP ============
// Lightweight formatting fixes only — templates are hand-written
// and don't need LLM-cliché filtering

function cleanupText(text: string): string {
  let result = text

  // Fix double spaces
  result = result.replace(/\s{2,}/g, " ")

  // Capitalize after periods
  result = result.replace(/\.\s+([a-z])/g, (_, letter) => `. ${letter.toUpperCase()}`)

  // Remove em-dashes if any sneak in
  result = result.replace(/ — /g, ". ")
  result = result.replace(/—/g, ", ")

  return result.trim()
}

// Keep export names for backward compatibility
const applyContentFramework = cleanupText

export { detectTopics, detectSentiment, extractEntities, applyContentFramework }
