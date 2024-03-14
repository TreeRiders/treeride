import type { InitError } from '@root/config/errors'
import type { Extension } from '@root/extensions/types'
import type { SettingsSchema } from '@root/schemas'
import { createContext, useContext } from 'react'

export interface ConfigContextValue {
  settings: SettingsSchema
  extensions: Extension[]
  errors: InitError[]
  changeSettings: (path: string, value: unknown) => void
  reload: () => void
}

export const ConfigContext = createContext<ConfigContextValue>({} as ConfigContextValue)

export const useConfig = () => useContext(ConfigContext)
