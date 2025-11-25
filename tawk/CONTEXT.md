# tawk: Complete Project Context

> This document captures all context from the initial design session for continuing development in a new repository.

---

## 1. The Vision: LLM-Augmented Unix Utils

### Origin
Inspired by [osgrep](https://github.com/Ryandonofrio3/osgrep) - grep augmented with local LLM and embeddings for semantic code search.

### Framework for Evaluating Unix Utils for LLM Augmentation

| Dimension | Question | Why It Matters |
|-----------|----------|----------------|
| **Intent Gap** | Is there a gap between what users *mean* and what they *type*? | grep "auth" vs. "find authentication logic" - this gap is where LLMs shine |
| **Latency Tolerance** | Can the task tolerate 100ms-2s response? | Real-time streaming = bad fit. Search/transform = good fit |
| **Failure Safety** | What's the blast radius if LLM is wrong? | Read-only = safe. `rm` = catastrophic |
| **Output Verifiability** | Can users quickly verify correctness? | Shows results you can scan = good. Silent mutations = risky |
| **Scope Boundedness** | Is the task well-defined enough? | "Find X" = bounded. "Refactor everything" = unbounded |

### The Sweet Spot Formula
```
High Value = (Large Intent Gap) + (Latency Tolerant) + (Safe to Fail) + (Verifiable Output)
```

### Tier List of Candidates

**Tier 1: Magic feels obvious**
- `grep` → `aigrep` - Semantic search (osgrep does this)
- `find` → `aifind` - Intent-based file finding
- `man` → `aiman` - Conversational docs
- `diff` → `aidiff` - Explain changes

**Tier 2: High value, more nuanced**
- `awk` → `tawk` - Natural language transforms ← **THIS PROJECT**
- `sed` → `aised` - Intent-based replacement
- `sort` → `aisort` - Semantic ordering
- `xargs` → `aixargs` - Smart batching

**Anti-patterns: Don't LLM these**
- `rm`, `chmod`, `chown` - Catastrophic failure mode
- `cp`, `mv` - Side effects + ambiguity
- `cd`, `pwd`, `mkdir` - No intent gap
- `ps`, `top` - Need speed, not intelligence

### Design Principles for "Practical Magic"
1. **Preserve the pipe** - Output should still compose
2. **Graceful degradation** - Fall back to exact match if LLM fails
3. **Show your work** - Display what the LLM "understood"
4. **Local first** - Privacy and speed (Ollama, not API calls)
5. **Familiar flags** - `-i`, `-r`, `-v` should still work
6. **One job well** - Unix philosophy still applies

---

## 2. Why awk? The Pain Points

### Research Sources
- [AWK Tutorial - Grymoire](https://www.grymoire.com/Unix/Awk.html)
- [30 AWK Examples - LikeGeeks](https://likegeeks.com/awk-command/)
- [AWK Command Examples - GeeksforGeeks](https://www.geeksforgeeks.org/linux-unix/awk-command-unixlinux-examples/)

### Common awk Use Cases
1. **Field extraction** - `awk '{print $1, $3}'`
2. **Data filtering** - `awk '$2 > 30 {print $1, $3}'`
3. **Log file analysis** - Extract errors, timestamps, IPs
4. **Calculations/aggregations** - `awk '{sum += $1} END {print sum}'`
5. **Custom field separators** - `-F','` for CSV
6. **Grouping** - Associative arrays for group-by operations

### Why awk is Hard (Pain Points)
1. **Invisible string concatenation** - Space between variables concatenates
2. **Quote mixing nightmares** - Single/double quote interactions
3. **Intimidating syntax** - `$1`, `$NF`, `NR`, pattern/action blocks
4. **Type conversion quirks** - "123X" becomes 0 (or 123 in some versions)
5. **Associative array output order** - No control over iteration order
6. **Users memorize incantations** - Learn specific commands, not the language

### The Intent Gap
```
What users want:        "sum the third column"
What they have to type: awk '{sum+=$3} END {print sum}'
```

This gap is exactly where LLM translation shines.

---

## 3. Research: osgrep Architecture

### Tech Stack
- **Language:** TypeScript
- **Package Manager:** pnpm
- **Runtime:** Node.js
- **CLI Framework:** Commander.js
- **Interactive UI:** @clack/prompts (spinners)
- **LLM:** transformers.js (local embeddings, no API)
- **Vector DB:** LanceDB

### Key Patterns We Borrowed

**1. Graceful Degradation**
```typescript
// If models don't exist locally, download them
if (!areModelsDownloaded()) {
  console.log("Downloading embedding models (~150MB)...");
  await downloadModels();
}
```

**2. Worker Thread Pattern**
- Embeddings run in worker threads
- LRU cache for computed embeddings
- Memory monitoring and restart

**3. Hybrid Search**
- Vector similarity + full-text search
- Reciprocal Rank Fusion to merge results
- Neural reranking with weighted blending

**4. CLI Design**
- Commands with clear options
- JSON output mode for agents
- Server mode with HTTP API for fast repeated queries

### What We Adapted for tawk
- Use Ollama instead of transformers.js (simpler for generation vs embeddings)
- No vector DB needed (we generate code, not search)
- Keep the spinner pattern from @clack/prompts
- Keep the graceful error handling pattern

---

## 4. Research: LLM for Data Wrangling

### Key Insight: EVAPORATE-CODE Pattern
From [Stanford/Cornell research](https://www.infoq.com/news/2023/05/data-transformation-using-llms/):

> Use LLM to generate code, not to process each row.

```
# WRONG: LLM processes every line (slow, expensive, inconsistent)
for line in data:
    result = llm.process(line)

# RIGHT: LLM generates code once, code processes all data
code = llm.generate("sum column 3")  # → "awk '{sum+=$3} END {print sum}'"
execute(code, data)  # Native speed
```

This is the core architecture of tawk:
1. LLM runs **once** to translate intent → awk command
2. Generated awk runs at native speed on all data
3. Users see what was generated (verifiable, educational)

---

## 5. tawk Design Decisions

### Name
`tawk` = "talk to awk" / "t-awk" (natural language awk)

### Tech Stack (Final)
| Component | Choice | Rationale |
|-----------|--------|-----------|
| Runtime | **Bun** | Fast, TypeScript native, good DX |
| Package Manager | **Bun** | Consistent with runtime |
| CLI Framework | **cac** | Simple 4-API design, used by Vite |
| Interactive UI | **@clack/prompts** | Beautiful spinners, cancel handling |
| LLM Client | **ollama** (official) | Simple HTTP, local-first |
| Language | **TypeScript** | Type safety, good tooling |

### Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                         tawk CLI (cac)                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  tawk "sum the third column" data.csv                       ││
│  │  cat log.txt | tawk "show errors with timestamps"           ││
│  └─────────────────────────────────────────────────────────────┘│
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Input Layer (input.ts)                         │
│  • Detect stdin vs file argument                                 │
│  • Sample first 5 lines for LLM context                         │
│  • Buffer content for execution                                  │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Format Detection (detector.ts)                      │
│  • Auto-detect delimiter (CSV, TSV, space, colon, pipe)         │
│  • Detect raw awk syntax → skip LLM, pass through               │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              LLM Translation (translator.ts)                     │
│  • ollama.generate() with focused prompt                        │
│  • Include data sample in prompt                                │
│  • Parse response → extract awk command                         │
│  • Spinner via @clack/prompts during generation                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Executor (executor.ts)                           │
│  • Bun.spawn() / Bun.$ for awk subprocess                       │
│  • Handle file input or piped stdin content                     │
│  • Stream stdout/stderr to terminal                             │
│  • Display generated command (unless --quiet)                   │
└─────────────────────────────────────────────────────────────────┘
```

### CLI Interface
```bash
tawk [intent] [options]

Options:
  -f, --file <path>            Input file (or pipe via stdin)
  -F, --field-separator <sep>  Field separator (auto-detected)
  -d, --dry                    Show generated command without executing
  -q, --quiet                  Only show output, hide generated command
  -m, --model <name>           Ollama model (default: llama3.2:3b)
  --raw                        Force raw awk mode (skip LLM)
  -h, --help                   Display help
  -v, --version                Display version

Examples:
  tawk "sum the third column" -f data.csv
  tawk "show rows where age > 30" -f users.csv
  cat log.txt | tawk "count lines with ERROR"
  tawk '{print $2}' -f data.csv  # raw awk pass-through
```

### Prompt Template
```
You translate natural language to awk commands.
Output ONLY the awk command. No explanation, no markdown, no backticks.

Rules:
- Use awk as primary tool
- For CSV use -F','
- For TSV use -F'\t'
- $1=first field, $NF=last field, NR=line number
- Use END{} for aggregations
- Use associative arrays for grouping

Field separator: {separator}
Data sample (first lines):
{sample}

Intent: {intent}
Command:
```

### Raw Awk Detection Patterns
```typescript
const awkPatterns = [
  /^\{.*\}$/,        // { print $1 }
  /^\/.+\//,         // /pattern/
  /^BEGIN\s*\{/,     // BEGIN {
  /^END\s*\{/,       // END {
  /\$\d+/,           // $1, $2, etc.
  /\$NF/,            // $NF
  /^NR\s*[><=!]/,    // NR > 1
]
```

### Format Detection Algorithm
```typescript
// Score each delimiter by consistency
// A good delimiter produces consistent field counts across lines
for (const delim of [',', '\t', '|', ':', ';', ' ']) {
  const counts = sample.map(line => line.split(delim).length)
  const uniqueCounts = new Set(counts)
  const consistency = 1 / uniqueCounts.size
  const fieldScore = Math.min(avgCount / 5, 1)
  const score = consistency * fieldScore
  // Pick highest scoring delimiter
}
```

---

## 6. Implementation Phases (Completed)

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Project scaffold with bun init | ✅ |
| 2 | MVP - prompt → ollama → execute | ✅ |
| 3 | Stdin and file input handling | ✅ |
| 4 | Data sampling and format detection | ✅ |
| 5 | CLI flags (--dry, --quiet, --model) | ✅ |
| 6 | Raw awk pass-through detection | ✅ |
| 7 | Polish and error handling | ✅ |

---

## 7. Current Code

### Project Structure
```
tawk/
├── src/
│   ├── index.ts       # CLI entry point (cac)
│   ├── translator.ts  # Ollama LLM integration
│   ├── executor.ts    # Bun shell execution
│   ├── input.ts       # File/stdin handling
│   └── detector.ts    # Format + raw awk detection
├── package.json
├── tsconfig.json
├── bun.lock
└── README.md
```

### package.json
```json
{
  "name": "tawk",
  "version": "0.1.0",
  "description": "Natural language awk - transform data with plain English",
  "type": "module",
  "bin": {
    "tawk": "./src/index.ts"
  },
  "scripts": {
    "dev": "bun run src/index.ts",
    "test": "bun test"
  },
  "devDependencies": {
    "@types/bun": "latest"
  },
  "peerDependencies": {
    "typescript": "^5"
  },
  "dependencies": {
    "@clack/prompts": "^0.11.0",
    "cac": "^6.7.14",
    "ollama": "^0.6.3"
  }
}
```

### src/index.ts
```typescript
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
```

### src/translator.ts
```typescript
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
```

### src/executor.ts
```typescript
import { $ } from 'bun'

export interface ExecuteOptions {
  file?: string
  stdinContent?: string
}

export async function execute(
  command: string,
  options: ExecuteOptions = {}
): Promise<void> {
  const { file, stdinContent } = options

  try {
    let result

    if (stdinContent) {
      // Pipe content to awk via echo
      result = await $`echo ${stdinContent} | sh -c ${command}`.quiet()
    } else if (file) {
      // Run with file argument
      const fullCommand = `${command} ${file}`
      result = await $`sh -c ${fullCommand}`.quiet()
    } else {
      // No input - just run the command
      result = await $`sh -c ${command}`.quiet()
    }

    if (result.stdout.length > 0) {
      process.stdout.write(result.stdout)
    }

    if (result.stderr.length > 0) {
      process.stderr.write(result.stderr)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`\x1b[31mExecution failed:\x1b[0m ${error.message}`)
    }
    process.exit(1)
  }
}
```

### src/input.ts
```typescript
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
```

### src/detector.ts
```typescript
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
```

---

## 8. What Works Now

### Raw Awk Mode (No Ollama Required)
```bash
# These all work without Ollama running:
tawk '{print $2}' -f data.csv              # ✅ auto-detects CSV
tawk 'NR > 1 {print $1}' -f data.csv       # ✅ skip header
tawk '{sum+=$3} END {print sum}' -f data.csv  # ✅ aggregation
echo -e "a,1\nb,2" | tawk '{print $1}'     # ✅ stdin piping
```

### Natural Language Mode (Needs Ollama)
```bash
# Requires: ollama serve && ollama pull llama3.2:3b
tawk "sum the third column" -f sales.csv
tawk "show rows where age > 30" -f users.csv
cat log.txt | tawk "count lines with ERROR"
```

### CLI Features
- `--help` - Shows usage with examples
- `--dry` - Preview command without executing
- `--quiet` - Only show output
- `-F` - Override field separator
- `-m` - Choose Ollama model

---

## 9. Known Issues / Future Work

### Current Limitations
1. **Stdin buffering** - Currently buffers all stdin into memory before processing
2. **No streaming LLM** - Waits for complete response (intentional - need full command)
3. **Model dependency** - Defaults to `llama3.2:3b`, user needs to pull it

### Future Phases (Not Implemented)
- Command history with replay (`--history`, `--replay`)
- Saved aliases/snippets (`--save "sumcol" "sum column"`)
- `--explain` verbose mode showing reasoning
- Error recovery suggestions
- Shell completion
- JSON lines support (jq integration)
- Learn from corrections

---

## 10. Testing Commands

```bash
# Setup
cd tawk
bun install

# Test CLI help
bun run src/index.ts --help

# Test raw awk (no Ollama needed)
echo -e "name,age,salary\nalice,30,50000\nbob,25,45000" > test.csv
bun run src/index.ts '{print $2}' -f test.csv
bun run src/index.ts 'NR > 1 {print $1}' -f test.csv
bun run src/index.ts '{sum+=$3} END {print sum}' -f test.csv

# Test natural language (needs Ollama)
ollama serve &
ollama pull llama3.2:3b
bun run src/index.ts "sum the salary column" -f test.csv
bun run src/index.ts "show names of people over 25" -f test.csv --dry
```

---

## 11. Reference Links

- [osgrep](https://github.com/Ryandonofrio3/osgrep) - Inspiration project
- [cac](https://github.com/cacjs/cac) - CLI framework
- [@clack/prompts](https://github.com/bombshell-dev/clack) - Interactive prompts
- [ollama-js](https://github.com/ollama/ollama-js) - Official Ollama client
- [Bun](https://bun.sh) - Runtime
- [EVAPORATE research](https://www.infoq.com/news/2023/05/data-transformation-using-llms/) - LLM code generation pattern
