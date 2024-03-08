import config from '@treeride/ui/tailwind-config'

/** @type {import('tailwindcss').Config} */
export default {
  ...config,
  content: [
    './src/renderer/**/*.{ts,tsx}',
  ],
}
