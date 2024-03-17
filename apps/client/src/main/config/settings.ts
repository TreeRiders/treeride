import { type SettingsSchema, settingsSchema } from '@treeride/schemas/schemas'
import type { SettingsInitError } from '@root/config/errors'
import type { ChangeSettingsPayload } from '@root/settings/types'
import objectPath from 'object-path-immutable'
import { readConfigFile, saveConfigFile } from '@treeride/schemas/utils'
import { resolveSettings } from '@treeride/resolver'
import { logger } from '../logger'

interface ReadSettingsResult {
  settings: SettingsSchema
  errors: SettingsInitError[]
}

interface ChangeSettingsResult {
  error: SettingsInitError | null
  settings: SettingsSchema
}

export const readSettings = (): ReadSettingsResult => {
  const settingsFilePath = resolveSettings()

  try {
    const settings = readConfigFile(settingsFilePath, settingsSchema)
    logger.debug('[Settings]: Read settings complete')
    return {
      settings,
      errors: [],
    }
  }
  catch (error) {
    return {
      settings: settingsSchema.parse({}),
      errors: [{
        message: (error as Error).message,
        type: 'settings',
      }],
    }
  }
}

export const changeSettings = (payload: ChangeSettingsPayload): ChangeSettingsResult => {
  const settingsFilePath = resolveSettings()

  try {
    const settings = readConfigFile(settingsFilePath, settingsSchema)
    const newSettings = objectPath.set(settings, payload.path, payload.value)
    saveConfigFile(settingsFilePath, settingsSchema, newSettings)
    logger.debug('[Settings]: Changed settings')
    return {
      error: null,
      settings: newSettings,
    }
  }
  catch (error) {
    return {
      error: {
        message: (error as Error).message,
        type: 'settings',
      },
      settings: settingsSchema.parse({}),
    }
  }
}
