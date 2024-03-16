import { existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { app } from 'electron'
import { saveConfigFile } from '@treeride/schemas/utils'
import { settingsSchema } from '@treeride/schemas/schemas'

interface PreflightConfigResult {
  isFirstRun: boolean
}

export const preflightConfig = (): PreflightConfigResult => {
  let isFirstRun = false

  const configPath = resolve(app.getPath('home'), '.config', 'treeride')
  const extensionsPath = resolve(configPath, 'extensions')
  const themesPath = resolve(configPath, 'themes')
  const settingsFilePath = resolve(configPath, 'settings.yml')

  if (!existsSync(settingsFilePath)) {
    isFirstRun = true
    saveConfigFile(settingsFilePath, settingsSchema, settingsSchema.parse({}))
  }

  if (!existsSync(configPath)) {
    mkdirSync(configPath, { recursive: true })
  }

  if (!existsSync(extensionsPath)) {
    mkdirSync(extensionsPath, { recursive: true })
  }

  if (!existsSync(themesPath)) {
    mkdirSync(themesPath, { recursive: true })
  }

  return {
    isFirstRun,
  }
}
