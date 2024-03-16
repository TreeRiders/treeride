import type { ExtensionSchema, SettingsSchema, ThemeSchema } from '@treeride/schemas/schemas'
import type { ExtensionInitError, ThemeInitError } from './errors'

export interface GetConfigResult {
  settings: SettingsSchema
  extensions: ExtensionSchema[]
  themes: ThemeSchema[]
  errors: (ThemeInitError | ExtensionInitError)[]
}
