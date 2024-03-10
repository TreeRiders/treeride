import type { ThemeSchema } from '@root/schemas'

const lightTheme: ThemeSchema = {
  title: 'Default Light',
  name: 'default-light',
  appearance: 'light',
  colors: {
    backgroundPrimary: '#FAFAFA',
    backgroundSecondary: '#E4E4E4',
    blink: '#457CEF',
    error: '#E24343',
    foreground: '#3E4047',
    selection: '#457CEF',
    warning: '#E2612A',
  },
}

export { lightTheme }
