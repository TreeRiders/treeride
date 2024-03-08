import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

const config = defineConfig({
  plugins: [
    react(
      { jsxRuntime: 'classic' },
    ),
    dts({ insertTypesEntry: true }),
  ],
  build: {
    sourcemap: true,
    copyPublicDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'treeride-ui',
      fileName: format => `treeride-ui.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'tailwindcss': 'tailwindcss',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})

export default config
