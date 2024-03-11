import { existsSync, lstatSync, mkdirSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  type InitError,
  getInitError,
} from '@root/config/errors'
import type { Extension, ReadConfigResult } from '@root/config/types'
import type {
  CommandSchema,
  ExtensionSchema,
  SettingsSchema,
  ThemeSchema,
} from '@root/schemas'
import {
  commandSchema,
  extensionSchema,
  settingsSchema,
  themeSchema,
} from '@root/schemas'
import { readConfigFile, saveConfigFile } from '@root/utils/schema'
import { app } from 'electron'
import objectPath from 'object-path'

export const readConfig = (): ReadConfigResult => {
  let isFirstRun = false
  const errors: InitError[] = []

  const configDirPath = resolve(app.getPath('home'), '.config', 'treeride')
  const settingsFilePath = resolve(configDirPath, 'settings.yml')
  const extensionsDirPath = resolve(configDirPath, 'extensions')

  if (!existsSync(configDirPath)) {
    mkdirSync(configDirPath, { recursive: true })
  }

  if (!existsSync(settingsFilePath)) {
    saveConfigFile(settingsFilePath, settingsSchema, settingsSchema.parse({}))
    isFirstRun = true
  }

  if (!existsSync(extensionsDirPath)) {
    mkdirSync(extensionsDirPath, { recursive: true })
  }

  let settings: SettingsSchema = settingsSchema.parse({})

  try {
    settings = readConfigFile(settingsFilePath, settingsSchema)
  }
  catch (error) {
    errors.push(getInitError({
      message: (error as Error).message,
    }))
  }

  const extensions: Extension[] = readdirSync(extensionsDirPath)
    .map((extensionDirName) => {
      const extensionDirPath = resolve(extensionsDirPath, extensionDirName)
      const extensionFilePath = resolve(extensionDirPath, 'extension.yml')
      const extensionThemesPath = resolve(extensionDirPath, 'themes')
      const extensionCommandsPath = resolve(extensionDirPath, 'commands')

      let extension: ExtensionSchema = null as unknown as ExtensionSchema

      try {
        extension = readConfigFile(extensionFilePath, extensionSchema)
      }
      catch (error) {
        errors.push(getInitError({
          extension: extensionDirName,
          message: (error as Error).message,
        }))
        return null as unknown as Extension
      }

      let themes: ThemeSchema[] = []
      if (existsSync(extensionThemesPath)) {
        themes = readdirSync(extensionThemesPath).filter(themeDirName => (
          lstatSync(resolve(extensionThemesPath, themeDirName)).isDirectory()
        ))
          .map((themeDirName) => {
            const themeDirPath = resolve(extensionThemesPath, themeDirName)
            const themeFilePath = resolve(themeDirPath, 'theme.yml')
            try {
              return readConfigFile(themeFilePath, themeSchema)
            }
            catch (error) {
              errors.push(getInitError({
                extension: extensionDirName,
                part: themeDirName,
                message: (error as Error).message,
              }))
              return null as unknown as ThemeSchema
            }
          })
          .filter(command => !!command)
      }

      let commands: CommandSchema[] = []
      if (existsSync(extensionCommandsPath)) {
        commands = readdirSync(extensionCommandsPath).filter(commandDirName => (
          lstatSync(resolve(extensionCommandsPath, commandDirName)).isDirectory()
        ))
          .map((commandDirName) => {
            const commandDirPath = resolve(extensionCommandsPath, commandDirName)
            const commandFilePath = resolve(commandDirPath, 'command.yml')
            try {
              return readConfigFile(commandFilePath, commandSchema)
            }
            catch (error) {
              errors.push(getInitError({
                extension: extensionDirName,
                part: commandDirName,
                message: (error as Error).message,
              }))
              return null as unknown as CommandSchema
            }
          })
          .filter(command => !!command)
      }

      const result: Extension = {
        ...extension,
        themes,
        commands,
      }

      return result
    })
    .filter(extension => !!extension)

  return {
    settings,
    extensions,
    errors,
    isFirstRun,
    settingsFilePath,
  }
}

export const writeSettingChanges = (config: ReadConfigResult, path: string, value: unknown): void => {
  objectPath.set(config.settings, path, value)
  saveConfigFile(config.settingsFilePath, settingsSchema, config.settings)
}
