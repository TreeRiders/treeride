import { resolve } from 'node:path'
import { existsSync, lstatSync, mkdirSync, readdirSync } from 'node:fs'
import { commandSchema, extensionSchema, themeSchema } from '@treeride/schemas'
import type { CommandSchema, ExtensionSchema, ThemeSchema } from '@treeride/schemas'
import { app } from 'electron'
import { readConfigFile } from '@root/utils/schema'
import { type InitError, getInitError } from '@root/config/errors'
import type { Extension } from '@root/extensions/types'

export class Extensions {
  #extensions: Extension[]
  #extensionsPath: string
  errors: InitError[]

  get extensions() {
    return this.#extensions
  }

  constructor() {
    this.#extensions = []
    this.#extensionsPath = resolve(app.getPath('home'), '.config', 'treeride', 'extensions')
    this.errors = []
    this.#preflight()
  }

  #preflight() {
    if (!existsSync(this.#extensionsPath)) {
      mkdirSync(this.#extensionsPath, { recursive: true })
    }
  }

  read() {
    this.errors = []

    const extensions: Extension[] = readdirSync(this.#extensionsPath)
      .map((extensionDirName) => {
        const extensionDirPath = resolve(this.#extensionsPath, extensionDirName)
        const extensionFilePath = resolve(extensionDirPath, 'extension.yml')
        const extensionThemesPath = resolve(extensionDirPath, 'themes')
        const extensionCommandsPath = resolve(extensionDirPath, 'commands')

        let extension: ExtensionSchema = null as unknown as ExtensionSchema

        try {
          extension = readConfigFile(extensionFilePath, extensionSchema)
        }
        catch (error) {
          this.errors.push(getInitError({
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
                this.errors.push(getInitError({
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
                this.errors.push(getInitError({
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

    this.#extensions = extensions
  }
}
