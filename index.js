// @ts-check

/** @type {import('prettier').Config} */
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
  plugins: ['prettier-plugin-tailwindcss'],
}
