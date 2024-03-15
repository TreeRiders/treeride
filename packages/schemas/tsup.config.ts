import { defineConfig } from 'tsup'

const config = defineConfig({
  entry: [
    'src/index.ts',
  ],
  shims: true,
})

export default config
