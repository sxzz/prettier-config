import process from 'node:process'
import { fileURLToPath } from 'node:url'
import type { Config } from 'prettier'

const resolveOpts = { paths: [process.cwd()] }
function isInstalled(pkg: string): boolean {
  try {
    require.resolve(pkg, resolveOpts)
    return true
  } catch {
    return false
  }
}

function resolvePlugin(pkg: string): string | undefined {
  try {
    return fileURLToPath(import.meta.resolve(pkg))
  } catch {}
}

const plugins: string[] = [
  fileURLToPath(import.meta.resolve('@prettier/plugin-oxc')),
]

if (isInstalled('astro')) {
  const plugin = resolvePlugin('prettier-plugin-astro')
  if (plugin) plugins.push(plugin)
}

export default {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: [
        '**/node_modules/**',
        '**/dist/**',
        '**/coverage/**',
        '**/temp/**',
        '**/.vitepress/cache/**',
        '**/.nuxt/**',
        '**/.vercel/**',
        '**/.changeset/**',
        '**/.idea/**',
        '**/.output/**',
        '**/.vite-inspect/**',

        // root directory
        'output/**',

        '**/CHANGELOG*.md',
        '**/*.min.*',
        '**/LICENSE*',
        '**/__snapshots__',
        '**/auto-import?(s).d.ts',
        '**/components.d.ts',
        '**/typed-router.d.ts',
        '**/pnpm-lock.yaml',
      ],
      options: {
        requirePragma: true,
      },
    },
    {
      files: ['**/jsr.json'],
      options: {
        parser: 'json-stringify',
      },
    },
  ],
  plugins,
} satisfies Config
