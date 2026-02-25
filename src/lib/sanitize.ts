/**
 * Text sanitization utilities for XSS prevention.
 * Applied to all user-generated text before storage.
 *
 * Strategy: React auto-escapes on render (JSX), so we do NOT double-escape
 * HTML entities before storage. Instead we:
 * 1. Strip invisible/control chars that have no legitimate use
 * 2. Collapse excessive whitespace
 * 3. Cap length
 *
 * For non-React contexts (email templates, etc), use escapeHtml() at render time.
 */

/** Characters that could trigger HTML injection or script execution */
const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
}

/**
 * Escapes HTML special characters to prevent XSS when content is rendered
 * outside React (email templates, PDF exports, etc).
 * Do NOT use for data stored in DB — React handles escaping on render.
 */
export function escapeHtml(str: string): string {
  return str.replace(/[&<>"']/g, (ch) => HTML_ENTITIES[ch] || ch)
}

/**
 * Strips characters that have no legitimate use in review/response text.
 * Removes null bytes, zero-width characters, bidi overrides, and other
 * control characters while preserving normal whitespace (spaces, tabs, newlines).
 */
export function stripControlChars(str: string): string {
  // eslint-disable-next-line no-control-regex
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F\u200B-\u200F\u2028-\u202F\uFEFF]/g, "")
}

/**
 * Sanitizes user-provided text for safe storage.
 * - Strips dangerous control characters (null bytes, zero-width, bidi overrides)
 * - Collapses excessive whitespace (multiple spaces → one, 3+ newlines → 2)
 * - Trims leading/trailing whitespace
 * - Caps at maxLength
 *
 * Preserves all printable Unicode (letters, numbers, punctuation, emoji).
 * Does NOT escape HTML — React handles that on render.
 */
export function sanitizeText(str: string, maxLength: number): string {
  let result = stripControlChars(str)
  result = result.replace(/[ \t]+/g, " ")
  result = result.replace(/\n{3,}/g, "\n\n")
  return result.trim().slice(0, maxLength)
}

/**
 * Sanitizes a name field for safe storage.
 * - Strips control characters
 * - Flattens to single line (newlines → spaces)
 * - Collapses multiple spaces
 * - Trims and caps at maxLength
 *
 * Preserves all printable Unicode (accented chars, CJK, Arabic, etc.)
 * plus common name punctuation (hyphens, apostrophes, periods, commas).
 */
export function sanitizeName(str: string, maxLength: number): string {
  let result = stripControlChars(str)
  result = result.replace(/\n/g, " ")
  result = result.replace(/\s+/g, " ")
  return result.trim().slice(0, maxLength)
}
