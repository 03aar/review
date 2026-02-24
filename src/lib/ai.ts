// AI Transformation Engine
// Generates polished reviews from raw customer input and auto-drafts responses

const POSITIVE_ADJECTIVES = [
  "amazing", "wonderful", "fantastic", "excellent", "outstanding",
  "incredible", "superb", "delightful", "exceptional", "remarkable",
]

const POSITIVE_VERBS = [
  "loved", "enjoyed", "appreciated", "was impressed by", "was blown away by",
]

const RESPONSE_OPENINGS_POSITIVE = [
  "Thank you so much for your wonderful review!",
  "We're thrilled to hear about your experience!",
  "What a fantastic review - thank you!",
  "We really appreciate you taking the time to share this!",
  "Thank you for the kind words!",
]

const RESPONSE_OPENINGS_NEUTRAL = [
  "Thank you for your honest feedback!",
  "We appreciate you sharing your experience with us.",
  "Thanks for letting us know about your visit.",
  "We value your feedback and appreciate you taking the time to write.",
]

const RESPONSE_OPENINGS_NEGATIVE = [
  "We're sorry to hear about your experience.",
  "Thank you for bringing this to our attention.",
  "We sincerely apologize for falling short of your expectations.",
  "We're disappointed to hear this and want to make it right.",
]

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function detectTopics(input: string): string[] {
  const topicKeywords: Record<string, string[]> = {
    "food quality": ["food", "meal", "dish", "taste", "flavor", "delicious", "fresh", "cook", "chef", "menu", "portion"],
    "service": ["service", "waiter", "waitress", "server", "staff", "friendly", "attentive", "helpful", "rude", "slow"],
    "ambiance": ["ambiance", "atmosphere", "decor", "vibe", "cozy", "loud", "noise", "music", "lighting", "clean"],
    "value": ["price", "value", "expensive", "cheap", "affordable", "worth", "cost", "money", "overpriced"],
    "wait time": ["wait", "waited", "long", "quick", "fast", "slow", "time", "minutes", "hour"],
    "cleanliness": ["clean", "dirty", "hygiene", "spotless", "messy", "tidy", "bathroom", "restroom"],
    "location": ["location", "parking", "accessible", "convenient", "find", "drive", "walk"],
    "drinks": ["drink", "cocktail", "wine", "beer", "coffee", "tea", "beverage", "bar"],
    "dessert": ["dessert", "sweet", "cake", "pie", "ice cream", "chocolate"],
    "professionalism": ["professional", "expertise", "knowledge", "experienced", "skilled", "competent"],
    "communication": ["communication", "responsive", "called", "email", "update", "informed"],
    "results": ["results", "outcome", "fixed", "solved", "resolved", "satisfied", "happy"],
  }

  const lowerInput = input.toLowerCase()
  const detected: string[] = []

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    if (keywords.some((kw) => lowerInput.includes(kw))) {
      detected.push(topic)
    }
  }

  return detected.length > 0 ? detected : ["overall experience"]
}

function detectSentiment(rating: number, input: string): "positive" | "neutral" | "negative" {
  if (rating >= 4) return "positive"
  if (rating <= 2) return "negative"

  const positiveWords = ["great", "good", "love", "amazing", "awesome", "excellent", "fantastic", "wonderful", "best", "happy", "perfect"]
  const negativeWords = ["bad", "terrible", "awful", "horrible", "worst", "hate", "disgusting", "rude", "slow", "dirty", "cold", "disappointed"]

  const lower = input.toLowerCase()
  const posCount = positiveWords.filter((w) => lower.includes(w)).length
  const negCount = negativeWords.filter((w) => lower.includes(w)).length

  if (posCount > negCount) return "positive"
  if (negCount > posCount) return "negative"
  return "neutral"
}

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

  let generatedReview: string

  if (rating >= 4) {
    // Positive review generation
    const adj = pickRandom(POSITIVE_ADJECTIVES)
    const verb = pickRandom(POSITIVE_VERBS)

    const lines: string[] = []

    // Opening
    if (rating === 5) {
      lines.push(`Had an absolutely ${adj} experience at ${businessName}!`)
    } else {
      lines.push(`Really ${verb} my visit to ${businessName}.`)
    }

    // Elaborate based on raw input
    const rawLower = rawInput.toLowerCase()

    if (topics.includes("food quality")) {
      lines.push("The food was outstanding - you can tell they use quality ingredients and put real care into every dish.")
    }
    if (topics.includes("service")) {
      if (rawLower.includes("waiter") || rawLower.includes("server") || rawLower.includes("waitress")) {
        lines.push("Our server was incredibly friendly and attentive without being overbearing. Really made the experience special.")
      } else {
        lines.push("The staff were warm, welcoming, and clearly passionate about what they do.")
      }
    }
    if (topics.includes("ambiance")) {
      lines.push("The atmosphere was perfectly curated - great vibe that makes you want to stay longer.")
    }
    if (topics.includes("value")) {
      lines.push("Great value for what you get. The quality absolutely justifies the price.")
    }
    if (topics.includes("drinks")) {
      lines.push("The drink selection is impressive and well-crafted.")
    }
    if (topics.includes("professionalism")) {
      lines.push("Extremely professional and knowledgeable. You can tell they really know their craft.")
    }
    if (topics.includes("results")) {
      lines.push("Delivered excellent results that exceeded my expectations.")
    }
    if (topics.includes("communication")) {
      lines.push("Communication was seamless throughout - always responsive and kept me informed.")
    }

    // If no specific topics detected, use the raw input smartly
    if (topics.length === 1 && topics[0] === "overall experience") {
      if (rawInput.length > 10) {
        lines.push(`Everything was ${adj} - from start to finish, a truly enjoyable experience.`)
      } else {
        lines.push(`${capitalize(adj)} in every way. The attention to detail really shows.`)
      }
    }

    // Closing
    lines.push("Will definitely be back! Highly recommend.")

    generatedReview = lines.join(" ")
  } else if (rating === 3) {
    // Mixed review
    const lines: string[] = []
    lines.push(`Visited ${businessName} recently and had a mixed experience.`)

    if (topics.includes("food quality")) {
      lines.push("The food was decent but nothing that really stood out.")
    }
    if (topics.includes("service")) {
      lines.push("Service was okay - not bad, but room for improvement.")
    }
    if (topics.includes("wait time")) {
      lines.push("The wait was a bit longer than expected, which was disappointing.")
    }
    if (topics.length === 1 && topics[0] === "overall experience") {
      lines.push("Some things were good, others could use improvement.")
    }

    lines.push("Has potential but a few things need to be addressed. Might give it another try.")

    generatedReview = lines.join(" ")
  } else {
    // Negative review (1-2 stars)
    const lines: string[] = []
    lines.push(`Unfortunately, my experience at ${businessName} was disappointing.`)

    if (topics.includes("service")) {
      lines.push("The service left a lot to be desired.")
    }
    if (topics.includes("wait time")) {
      lines.push("Had to wait an unreasonable amount of time.")
    }
    if (topics.includes("food quality")) {
      lines.push("The food quality didn't meet expectations for the price point.")
    }
    if (topics.includes("cleanliness")) {
      lines.push("Cleanliness could definitely be improved.")
    }
    if (topics.length === 1 && topics[0] === "overall experience") {
      lines.push("The overall experience didn't match what I was expecting based on other reviews.")
    }

    lines.push("I hope the management takes feedback seriously and makes improvements.")

    generatedReview = lines.join(" ")
  }

  return {
    generatedReview,
    sentiment,
    topics,
  }
}

export function generateResponse(input: {
  review: string
  rating: number
  businessName: string
  customerName?: string
}): string {
  const { review, rating, businessName, customerName } = input
  const topics = detectTopics(review)
  const greeting = customerName ? `Hi ${customerName}` : "Hi there"

  const lines: string[] = []

  if (rating >= 4) {
    lines.push(`${greeting}! ${pickRandom(RESPONSE_OPENINGS_POSITIVE)}`)

    if (topics.includes("food quality")) {
      lines.push("We're so glad you enjoyed the food - our kitchen team puts their heart into every dish.")
    }
    if (topics.includes("service")) {
      lines.push("We'll make sure to pass along your kind words to our team. They'll be thrilled!")
    }
    if (topics.includes("ambiance")) {
      lines.push("We worked hard to create just the right atmosphere, so it means a lot that you noticed.")
    }
    if (topics.includes("professionalism")) {
      lines.push("Our team takes great pride in their work, and your recognition means the world to them.")
    }

    lines.push(`We can't wait to welcome you back to ${businessName}!`)
  } else if (rating === 3) {
    lines.push(`${greeting}, ${pickRandom(RESPONSE_OPENINGS_NEUTRAL)}`)

    if (topics.includes("wait time")) {
      lines.push("We understand the wait can be frustrating, and we're actively working on improving our efficiency during peak hours.")
    }
    if (topics.includes("service")) {
      lines.push("We're always looking to improve our service, and your feedback helps us do that.")
    }

    lines.push(`We'd love the chance to give you a better experience next time at ${businessName}. Please don't hesitate to reach out to us directly!`)
  } else {
    lines.push(`${greeting}, ${pickRandom(RESPONSE_OPENINGS_NEGATIVE)}`)

    if (topics.includes("wait time")) {
      lines.push("We've taken note of the wait time issue and are making changes to our operations to ensure this doesn't happen again.")
    }
    if (topics.includes("service")) {
      lines.push("We've addressed this with our team and are implementing additional training to ensure everyone receives the excellent service they deserve.")
    }
    if (topics.includes("food quality")) {
      lines.push("We hold ourselves to high standards, and we're taking immediate steps to address the quality concerns you've raised.")
    }
    if (topics.includes("cleanliness")) {
      lines.push("Cleanliness is a top priority for us, and we've already taken steps to improve our standards.")
    }

    lines.push(`We would really appreciate the chance to make this right. Please reach out to us directly at ${businessName} so we can discuss how to improve your experience.`)
  }

  return lines.join(" ")
}

export { detectTopics, detectSentiment }
