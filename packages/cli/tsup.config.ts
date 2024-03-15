import { defineConfig } from 'tsup'

const config = defineConfig({
  entry: ['src/cli.tsx'],
  splitting: false,
  sourcemap: false,
  platform: 'node',
  bundle: true,
  clean: true,
})

export default config
