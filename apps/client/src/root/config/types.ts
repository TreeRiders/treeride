import type { CommandSchema, ExtensionSchema, SettingsSchema, ThemeSchema } from '@root/schemas'
import type { InitError } from './errors'

interface Extension extends ExtensionSchema {
  themes: ThemeSchema[]
  commands: CommandSchema[]
}

interface ReadConfigResult {
  settingsFilePath: string
  settings: SettingsSchema
  extensions: Extension[]
  errors: InitError[]
  isFirstRun?: boolean
}

export interface ChangeSettingsPayload {
  path: string
  value: unknown
}

export { type Extension, type ReadConfigResult }
