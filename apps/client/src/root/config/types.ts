import type { Extension } from '@root/extensions/types'
import type { SettingsSchema } from '@root/schemas'
import type { InitError } from './errors'

export interface GetConfigResult {
  settings: SettingsSchema
  extensions: Extension[]
  errors: InitError[]
}
