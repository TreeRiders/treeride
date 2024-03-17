import { readdirSync } from 'node:fs'
import { type ThemeSchema, themeSchema } from '@treeride/schemas/schemas'
import type { ThemeInitError } from '@root/config/errors'
import { readConfigFile } from '@treeride/schemas/utils'
import { resolveTheme, resolveThemes } from '@treeride/resolver'
import { logger } from '../logger'

interface ReadThemesResult {
  themes: ThemeSchema[]
  errors: ThemeInitError[]
}

export const readThemes = (): ReadThemesResult => {
  const themesPath = resolveThemes()
  const errors: ThemeInitError[] = []
  const themes: ThemeSchema[] = []

  readdirSync(themesPath).forEach((themeFile) => {
    const themePath = resolveTheme(themeFile)

    try {
      const theme = readConfigFile(themePath, themeSchema)
      themes.push(theme)
    }
    catch (error) {
      errors.push({
        message: (error as Error).message,
        theme: themeFile,
        type: 'theme',
      })
    }
  })

  logger.debug('[Themes]: Read themes complete')

  return {
    themes,
    errors,
  }
}
