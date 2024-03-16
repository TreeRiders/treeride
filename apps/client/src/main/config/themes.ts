import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'
import { type ThemeSchema, themeSchema } from '@treeride/schemas/schemas'
import { app } from 'electron'
import type { ThemeInitError } from '@root/config/errors'
import { readConfigFile } from '@treeride/schemas/utils'

interface ReadThemesResult {
  themes: ThemeSchema[]
  errors: ThemeInitError[]
}

export const readThemes = (): ReadThemesResult => {
  const themesPath = resolve(app.getPath('home'), '.config', 'treeride', 'themes')
  const errors: ThemeInitError[] = []
  const themes: ThemeSchema[] = []

  readdirSync(themesPath).forEach((themeFile) => {
    const themePath = resolve(themesPath, themeFile)

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

  return {
    themes,
    errors,
  }
}
