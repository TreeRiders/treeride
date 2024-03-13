import type { GetExtensionsResult, GetSettingsResult } from '@root/config/types'
import { createContext, useContext } from 'react'

export interface ConfigContextValue {
  settings: GetSettingsResult
  extensions: GetExtensionsResult
  changeSettings: (path: string, value: unknown) => void
  reloadSettings: () => void
  reloadExtensions: () => void
}

export const ConfigContext = createContext<ConfigContextValue>({} as ConfigContextValue)

export const useConfig = () => useContext(ConfigContext)
