module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: [
        'node_modules',
        'dist',
        'coverage',
        '.vite-inspect',
        '.output',
        '.changeset',
        'CHANGELOG.md',
        'pnpm-lock.yaml',
      ],
      options: {
        rangeEnd: 0,
      },
    },
  ],
}
