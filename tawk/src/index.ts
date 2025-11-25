#!/usr/bin/env bun
import { cac } from 'cac'
import { translate } from './translator.ts'
import { execute } from './executor.ts'
import { getInput, sampleLines } from './input.ts'
import { detectFormat, isRawAwk } from './detector.ts'

const cli = cac('tawk')

cli
  .command('[intent]', 'Transform data with natural language or raw awk')
  .option('-f, --file <path>', 'Input file (or pipe via stdin)')
  .option('-F, --field-separator <sep>', 'Field separator (auto-detected)')
  .option('-d, --dry', 'Show generated command without executing')
  .option('-q, --quiet', 'Only show output, hide generated command')
  .option('-m, --model <name>', 'Ollama model', { default: 'llama3.2:3b' })
  .option('--raw', 'Force raw awk mode (skip LLM)')
  .example('tawk "sum the third column" -f data.csv')
  .example('tawk "show rows where age > 30" -f users.csv')
  .example('cat log.txt | tawk "count lines with ERROR"')
  .example('tawk \'{print $2}\' -f data.csv  # raw awk pass-through')
  .action(async (intent: string | undefined, options) => {
    if (!intent) {
      cli.outputHelp()
      process.exit(0)
    }

    // Get input data (from file or stdin)
    let input
    try {
      input = await getInput(options.file)
    } catch (err) {
      if (err instanceof Error) {
        console.error(`\x1b[31mError:\x1b[0m ${err.message}`)
      }
      process.exit(1)
    }

    // Sample first lines for LLM context
    const sample = sampleLines(input.content, 5)

    // Auto-detect format if not specified
    const detectedFormat = detectFormat(sample)
    const fieldSeparator = options.fieldSeparator || detectedFormat.separator

    // Check if intent is raw awk (skip LLM)
    if (options.raw || isRawAwk(intent)) {
      const fsFlag = fieldSeparator !== ' ' ? `-F'${fieldSeparator}' ` : ''
      const command = `awk ${fsFlag}'${intent}'`

      if (!options.quiet) {
        console.log(`\x1b[2m→ ${command} (raw)\x1b[0m`)
      }

      if (!options.dry) {
        await execute(command, {
          file: input.source === 'file' ? input.path : undefined,
          stdinContent: input.source === 'stdin' ? input.content : undefined,
        })
      }
      return
    }

    // Translate intent to awk command
    const command = await translate(intent, {
      model: options.model,
      fieldSeparator,
      sample,
    })

    if (!options.quiet) {
      console.log(`\x1b[2m→ ${command}\x1b[0m`)
    }

    if (!options.dry) {
      await execute(command, {
        file: input.source === 'file' ? input.path : undefined,
        stdinContent: input.source === 'stdin' ? input.content : undefined,
      })
    }
  })

cli.help()
cli.version('0.1.0')

cli.parse()
