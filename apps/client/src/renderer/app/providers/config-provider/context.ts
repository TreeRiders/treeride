import type { ReadConfigResult } from '@root/config/types'
import { createContext, useContext } from 'react'

interface ConfigContextValue {
  config: ReadConfigResult
  reload: () => void
}

const ConfigContext = createContext<ConfigContextValue>({} as ConfigContextValue)

const useConfig = () => useContext(ConfigContext)

export { ConfigContext, useConfig, type ConfigContextValue }
