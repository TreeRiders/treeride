import type { CommandSchema, ExtensionSchema, SettingsSchema, ThemeSchema } from '@root/schemas'
import type { InitError } from './errors'

interface Extension extends ExtensionSchema {
  themes: ThemeSchema[]
  commands: CommandSchema[]
}

interface ReadConfigResult {
  settings: SettingsSchema
  extensions: Extension[]
  errors: InitError[]
  isFirstRun?: boolean
}

export { type Extension, type ReadConfigResult }
