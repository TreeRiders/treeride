import preset from '@treeride/ui/tailwind.config.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [
    './src/renderer/**/*.{ts,tsx}',
  ],
  corePlugins: {
    preflight: true,
  },
}
