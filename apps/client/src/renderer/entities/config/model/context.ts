import type { InitError } from '@root/config/errors'
import type { ChangeSettingsPayload } from '@root/settings/types'
import type { ExtensionSchema, SettingsSchema, ThemeSchema } from '@treeride/schemas/schemas'

import { createContext, useContext } from 'react'

export interface ConfigContextValue {
  settings: SettingsSchema
  extensions: ExtensionSchema[]
  themes: ThemeSchema[]
  errors: InitError[]
  changeSettings: (payload: ChangeSettingsPayload) => void
  reload: () => void
}

export const ConfigContext = createContext<ConfigContextValue>({} as ConfigContextValue)

export const useConfig = () => useContext(ConfigContext)
