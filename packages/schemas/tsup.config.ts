import { defineConfig } from 'tsup'

const config = defineConfig({
  entry: [
    'src/schemas/index.ts',
    'src/utils/index.ts',
  ],
  shims: true,
})

export default config
