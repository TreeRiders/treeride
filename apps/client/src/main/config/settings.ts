import { resolve } from 'node:path'
import { app } from 'electron'
import { type SettingsSchema, settingsSchema } from '@treeride/schemas/schemas'
import type { SettingsInitError } from '@root/config/errors'
import type { ChangeSettingsPayload } from '@root/settings/types'
import objectPath from 'object-path-immutable'
import { readConfigFile, saveConfigFile } from '@treeride/schemas/utils'

interface ReadSettingsResult {
  settings: SettingsSchema
  errors: SettingsInitError[]
}

interface ChangeSettingsResult {
  error: SettingsInitError | null
  settings: SettingsSchema
}

export const readSettings = (): ReadSettingsResult => {
  const settingsFilePath = resolve(app.getPath('home'), '.config', 'treeride', 'settings.yml')

  try {
    const settings = readConfigFile(settingsFilePath, settingsSchema)
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
  const settingsFilePath = resolve(app.getPath('home'), '.config', 'treeride', 'settings.yml')

  try {
    const settings = readConfigFile(settingsFilePath, settingsSchema)
    const newSettings = objectPath.set(settings, payload.path, payload.value)
    saveConfigFile(settingsFilePath, settingsSchema, newSettings)
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
