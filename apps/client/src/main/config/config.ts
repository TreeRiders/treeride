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

const readConfig = (): ReadConfigResult => {
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

      let themes: ThemeSchema[] = []
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

      if (existsSync(extensionThemesPath)) {
        themes = readdirSync(extensionThemesPath)
          .map((themeFile) => {
            const themePath = resolve(extensionThemesPath, themeFile)

            try {
              return readConfigFile(themePath, themeSchema)
            }
            catch (error) {
              errors.push(getInitError({
                extension: extensionDirName,
                part: themeFile,
                message: (error as Error).message,
              }))
              return null as unknown as ThemeSchema
            }
          })
          .filter(theme => !!theme)
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
  }
}

export { readConfig }
