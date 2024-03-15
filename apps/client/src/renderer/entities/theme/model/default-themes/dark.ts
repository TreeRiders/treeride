import type { ThemeSchema } from '@treeride/schemas'

export const defaultDarkTheme: ThemeSchema = {
  title: 'Default Dark',
  name: 'default-dark',
  appearance: 'dark',
  colors: {
    backgroundPrimary: '#303446',
    backgroundSecondary: '#303446',
    blink: '#838BA7',
    error: '#E78284',
    foreground: '#C6D0F5',
    selection: '#737994',
    warning: '#EF9F76',
  },
}
