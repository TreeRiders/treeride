import { existsSync, mkdirSync } from 'node:fs'
import { saveConfigFile } from '@treeride/schemas/utils'
import { settingsSchema } from '@treeride/schemas/schemas'
import { resolveConfig, resolveExtensions, resolveRenderChild, resolveSettings, resolveThemes } from '@treeride/resolver'
import { logger } from '../logger'

interface PreflightConfigResult {
  isFirstRun: boolean
}

export const preflightConfig = (): PreflightConfigResult => {
  let isFirstRun = false

  const configPath = resolveConfig()
  const extensionsPath = resolveExtensions()
  const themesPath = resolveThemes()
  const settingsFilePath = resolveSettings()
  const renderChildPath = resolveRenderChild()

  if (!existsSync(settingsFilePath)) {
    isFirstRun = true
    saveConfigFile(settingsFilePath, settingsSchema, settingsSchema.parse({}))
    logger.debug('[Config]: Created settings file')
  }

  if (!existsSync(renderChildPath)) {
    mkdirSync(renderChildPath, { recursive: true })
    logger.debug('[Config]: Created render child directory')
  }

  if (!existsSync(configPath)) {
    mkdirSync(configPath, { recursive: true })
    logger.debug('[Config]: Created config directory')
  }

  if (!existsSync(extensionsPath)) {
    mkdirSync(extensionsPath, { recursive: true })
    logger.debug('[Config]: Created extensions directory')
  }

  if (!existsSync(themesPath)) {
    mkdirSync(themesPath, { recursive: true })
    logger.debug('[Config]: Created themes directory')
  }

  logger.debug(`[Config]: Is first run: ${isFirstRun}`)
  logger.debug('[Config]: Preflight checks complete')

  return {
    isFirstRun,
  }
}
