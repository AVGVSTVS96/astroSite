/**
 * Input handling - read from file or stdin
 */

export interface InputData {
  content: string
  source: 'file' | 'stdin'
  path?: string
}

/**
 * Check if stdin has data (is being piped to)
 * isTTY is true when interactive terminal, undefined/false when piped
 */
function hasStdin(): boolean {
  return !process.stdin.isTTY
}

/**
 * Read all data from stdin
 */
async function readStdin(): Promise<string> {
  const chunks: Buffer[] = []

  for await (const chunk of process.stdin) {
    chunks.push(chunk)
  }

  return Buffer.concat(chunks).toString('utf-8')
}

/**
 * Read data from file
 */
async function readFile(path: string): Promise<string> {
  const file = Bun.file(path)

  if (!(await file.exists())) {
    throw new Error(`File not found: ${path}`)
  }

  return file.text()
}

/**
 * Get input data from file or stdin
 * Priority: explicit file > stdin > error
 */
export async function getInput(filePath?: string): Promise<InputData> {
  // Explicit file takes priority
  if (filePath) {
    const content = await readFile(filePath)
    return { content, source: 'file', path: filePath }
  }

  // Check for piped stdin
  if (hasStdin()) {
    const content = await readStdin()
    return { content, source: 'stdin' }
  }

  // No input provided
  throw new Error('No input provided. Pipe data or use -f <file>')
}

/**
 * Sample first N lines of input for LLM context
 */
export function sampleLines(content: string, n: number = 5): string[] {
  return content.split('\n').slice(0, n).filter(Boolean)
}
