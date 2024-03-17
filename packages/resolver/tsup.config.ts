import { defineConfig } from 'tsup'

const config = defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: false,
  platform: 'node',
  bundle: true,
  clean: true,
})

export default config
