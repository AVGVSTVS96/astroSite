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
