import type { ReadConfigResult } from '@root/config/types'
import { createContext, useContext } from 'react'

export interface ConfigContextValue {
  config: ReadConfigResult
  reload: () => void
}

export const ConfigContext = createContext<ConfigContextValue>({} as ConfigContextValue)

export const useConfig = () => useContext(ConfigContext)
