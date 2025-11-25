/**
 * Format detection - detect delimiter and data format
 */

export interface FormatInfo {
  separator: string
  separatorName: string
}

/**
 * Common delimiter patterns with their display names
 */
const DELIMITERS = [
  { char: ',', name: 'comma (CSV)' },
  { char: '\t', name: 'tab (TSV)' },
  { char: '|', name: 'pipe' },
  { char: ':', name: 'colon' },
  { char: ';', name: 'semicolon' },
  { char: ' ', name: 'space' },
] as const

/**
 * Detect the most likely field separator from sample lines
 * Uses consistency heuristic: a good delimiter produces consistent field counts
 */
export function detectFormat(sample: string[]): FormatInfo {
  if (sample.length === 0) {
    return { separator: ' ', separatorName: 'space' }
  }

  let bestDelimiter = DELIMITERS[DELIMITERS.length - 1]! // default to space
  let bestScore = 0

  for (const delim of DELIMITERS) {
    const counts = sample.map((line) => line.split(delim.char).length)

    // Skip if delimiter not found (all counts are 1)
    if (counts.every((c) => c === 1)) continue

    // Score based on consistency (all lines have same field count)
    const uniqueCounts = new Set(counts)
    const avgCount = counts.reduce((a, b) => a + b, 0) / counts.length

    // Prefer: consistent counts + multiple fields
    const consistency = 1 / uniqueCounts.size
    const fieldScore = Math.min(avgCount / 5, 1) // normalize, cap at 5 fields
    const score = consistency * fieldScore

    if (score > bestScore) {
      bestScore = score
      bestDelimiter = delim
    }
  }

  return {
    separator: bestDelimiter.char,
    separatorName: bestDelimiter.name,
  }
}

/**
 * Check if input looks like raw awk syntax (not natural language)
 */
export function isRawAwk(input: string): boolean {
  const trimmed = input.trim()

  // Patterns that indicate raw awk
  const awkPatterns = [
    /^\{.*\}$/, // { print $1 }
    /^\/.+\//, // /pattern/
    /^BEGIN\s*\{/, // BEGIN {
    /^END\s*\{/, // END {
    /\$\d+/, // $1, $2, etc.
    /\$NF/, // $NF
    /^NR\s*[><=!]/, // NR > 1
  ]

  return awkPatterns.some((pattern) => pattern.test(trimmed))
}
