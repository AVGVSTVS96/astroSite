# tawk

Natural language awk. Transform data with plain English.

## Requirements

- [Bun](https://bun.sh) runtime
- [Ollama](https://ollama.ai) running locally with a model (e.g., `llama3.2:3b`)

## Install

```bash
bun install
```

## Usage

```bash
# Natural language (uses LLM)
tawk "sum the third column" -f sales.csv
tawk "show rows where age > 30" -f users.csv
cat log.txt | tawk "count lines with ERROR"

# Raw awk pass-through (auto-detected, no LLM)
tawk '{print $2}' -f data.csv
tawk 'NR > 1 {print $1, $3}' -f data.csv
```

## Options

```
-f, --file <path>            Input file (or pipe via stdin)
-F, --field-separator <sep>  Field separator (auto-detected)
-d, --dry                    Show generated command without executing
-q, --quiet                  Only show output, hide generated command
-m, --model <name>           Ollama model (default: llama3.2:3b)
--raw                        Force raw awk mode (skip LLM)
```

## How it works

1. Detects if input is raw awk syntax or natural language
2. If natural language, samples data and sends to local LLM
3. LLM generates awk command
4. Executes and streams output

Format detection is automatic - CSV, TSV, and other delimiters are recognized from the data.
