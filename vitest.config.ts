import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

const snapshot = resolve(process.env['DSH_SNAPSHOT_DIR'] ?? '../deepseek-harness')
if (!existsSync(resolve(snapshot, 'package.json'))) {
  throw new Error(`DSH snapshot not found at ${snapshot}; set DSH_SNAPSHOT_DIR`)
}

const alias = (path: string): string => resolve(snapshot, path)

export default defineConfig({
  resolve: {
    alias: {
      'cordis': alias('vendor/cordis/lib/index.js'),
      'cosmokit': alias('vendor/cosmokit/lib/index.js'),
      'schemastery': alias('vendor/schemastery/lib/index.mjs'),
      '@deepseek-ai/cordis': alias('vendor/cordis/lib/index.js'),
      '@deepseek-ai/dsh-agent': alias('packages/core/agent/lib/index.js'),
      '@deepseek-ai/dsh-commands': alias('packages/interaction/commands/lib/types/index.js'),
      '@deepseek-ai/dsh-llm': alias('packages/llm/llm/lib/index.js'),
      '@deepseek-ai/dsh-session': alias('packages/core/session/lib/index.js'),
      '@deepseek-ai/dsh-subagent': alias('packages/subagent/subagent/lib/index.js'),
      '@deepseek-ai/dsh-system-prompt': alias('packages/core/system-prompt/lib/index.js'),
      '@deepseek-ai/dsh-jobs': alias('packages/jobs/jobs/src/index.ts'),
      '@deepseek-ai/dsh-tools': alias('packages/core/tools/lib/index.js'),
      '@deepseek-ai/dsh-user-approval': alias('packages/interaction/user-approval/lib/types/index.js'),
      '@deepseek-ai/dsh-user-questions': alias('packages/interaction/user-questions/src/index.ts'),
      '@deepseek-ai/dsh-workflow': alias('packages/workflow/workflow/lib/index.js'),
      '@deepseek-ai/dsh-tool-workflow/types': alias('packages/workflow/tool-workflow/src/types.ts'),
      '@deepseek-ai/schemastery': alias('vendor/schemastery/lib/index.mjs'),
    },
  },
  test: {
    include: ['tests/**/*.spec.ts'],
    // QuickJS scripts are bounded by wall-clock budgets (the fixtures use short ones),
    // so concurrent worker processes make those budgets measure host scheduling instead
    // of script work and turn them into random interruptions. The suite is small, so
    // running spec files one at a time keeps the budgets meaningful and the gate stable.
    fileParallelism: false,
    testTimeout: 30_000,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      reporter: ['text', 'json-summary'],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80
      }
    }
  }
})
