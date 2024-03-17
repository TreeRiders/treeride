import { defineConfig } from 'tsup'

const config = defineConfig({
  entry: ['src/index.ts', 'src/vm.ts'],
  splitting: false,
  sourcemap: false,
  format: 'cjs',
  platform: 'node',
  bundle: true,
  noExternal: ['@treeride/resolver'],
  clean: true,
})

export default config
