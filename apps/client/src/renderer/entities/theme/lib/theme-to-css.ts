import type { ThemeSchema } from '@treeride/schemas'

export interface ThemeColors {
  background: string
  backgroundPrimary: string
  backgroundSecondary: string
  foreground: string
  border: string
  border100: string
  border200: string
  foreground100: string
  foreground400: string
  foreground600: string
  selection: string
  selection100: string
  blink: string
  warning: string
  error: string

}

const hexToRgba = (hex: string, alpha: number): string => {
  const rColor = Number.parseInt(hex.slice(1, 3), 16)
  const gColor = Number.parseInt(hex.slice(3, 5), 16)
  const bColor = Number.parseInt(hex.slice(5, 7), 16)

  return `rgba(${rColor}, ${gColor}, ${bColor}, ${alpha})`
}

export const themeToCSS = (theme: ThemeSchema): [ThemeColors, string] => {
  const themeColors: ThemeColors = {
    background: theme.colors.backgroundPrimary,
    backgroundPrimary: hexToRgba(theme.colors.backgroundPrimary, 0.4),
    backgroundSecondary: hexToRgba(theme.colors.backgroundSecondary, 0.4),
    foreground: theme.colors.foreground,
    border: theme.colors.foreground,
    border100: hexToRgba(theme.colors.foreground, 0.1),
    border200: hexToRgba(theme.colors.foreground, 0.2),
    foreground100: hexToRgba(theme.colors.foreground, 0.1),
    foreground400: hexToRgba(theme.colors.foreground, 0.4),
    foreground600: hexToRgba(theme.colors.foreground, 0.6),
    selection: theme.colors.selection,
    selection100: hexToRgba(theme.colors.selection, 0.1),
    blink: theme.colors.blink,
    warning: theme.colors.warning,
    error: theme.colors.warning,
  }

  return [
    themeColors,
` :root {
    --color-background: ${themeColors.background};
    --color-background-primary: ${themeColors.backgroundPrimary};
    --color-background-secondary: ${themeColors.backgroundSecondary};
    --color-background-tinted: rgba(128, 128, 128, 0.2);
    --color-foreground: ${themeColors.foreground};
    --color-border: ${themeColors.border};
    --color-border-100: ${themeColors.border100};
    --color-border-200: ${themeColors.border200};
    --color-foreground-100: ${themeColors.foreground100};
    --color-foreground-400: ${themeColors.foreground400};
    --color-foreground-600: ${themeColors.foreground600};
    --color-selection: ${themeColors.selection};
    --color-selection-100: ${themeColors.selection100};
    --color-blink: ${themeColors.blink};
    --color-warning: ${themeColors.warning};
    --color-error: ${themeColors.error};
  }`,
  ]
}
