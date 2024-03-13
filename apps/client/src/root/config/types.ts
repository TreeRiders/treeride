import type { CommandSchema, ExtensionSchema, SettingsSchema, ThemeSchema } from '@root/schemas'
import type { InitError } from './errors'

interface Extension extends ExtensionSchema {
  themes: ThemeSchema[]
  commands: CommandSchema[]
}

export interface ChangeSettingsPayload {
  path: string
  value: unknown
}

export interface GetSettingsResult {
  settings: SettingsSchema
  errors: InitError[]
}

export interface GetExtensionsResult {
  extensions: Extension[]
  errors: InitError[]
}

export { type Extension }
