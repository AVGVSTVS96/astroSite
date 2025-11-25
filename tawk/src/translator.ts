import { spinner } from '@clack/prompts'
import { Ollama } from 'ollama'

export interface TranslateOptions {
  model: string
  fieldSeparator?: string
  sample?: string[]
}

const PROMPT_TEMPLATE = `You translate natural language to awk commands.
Output ONLY the awk command. No explanation, no markdown, no backticks.

Rules:
- Use awk as primary tool
- For CSV use -F','
- For TSV use -F'\\t'
- $1=first field, $NF=last field, NR=line number
- Use END{} for aggregations
- Use associative arrays for grouping
{separator}
Data sample (first lines):
{sample}

Intent: {intent}
Command:`

export async function translate(
  intent: string,
  options: TranslateOptions
): Promise<string> {
  const s = spinner()
  s.start('Thinking...')

  try {
    const ollama = new Ollama()

    // Build prompt with sample data
    const sampleText = options.sample?.join('\n') || '(no sample provided)'
    const separatorText = options.fieldSeparator
      ? `\nField separator: ${options.fieldSeparator}`
      : ''

    const prompt = PROMPT_TEMPLATE
      .replace('{intent}', intent)
      .replace('{sample}', sampleText)
      .replace('{separator}', separatorText)

    const response = await ollama.generate({
      model: options.model,
      prompt,
      stream: false,
    })

    s.stop('Generated')

    // Clean up response - remove any markdown or extra whitespace
    const command = response.response
      .trim()
      .replace(/^```\w*\n?/, '')
      .replace(/\n?```$/, '')
      .trim()

    return command
  } catch (error) {
    s.stop('Failed')

    // Check for connection refused (Ollama not running)
    const isConnectionError =
      (error instanceof Error && error.message.includes('ECONNREFUSED')) ||
      (error && typeof error === 'object' && 'code' in error && error.code === 'ConnectionRefused')

    if (isConnectionError) {
      console.error('\x1b[31mError: Ollama is not running.\x1b[0m')
      console.error('Start it with: ollama serve')
      process.exit(1)
    }

    throw error
  }
}
