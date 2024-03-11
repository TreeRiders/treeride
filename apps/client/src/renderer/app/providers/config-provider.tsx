import type { FC, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import type { ReadConfigResult } from '@root/config/types'
import type { ConfigContextValue } from '@entities/config'
import { ConfigContext, useGetConfigQuery, useReloadConfigMutation } from '@entities/config'

type ConfigProviderProps = PropsWithChildren

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const { data: config } = useGetConfigQuery()

  const { mutate: reload } = useReloadConfigMutation()

  const value = useMemo<ConfigContextValue>(() => ({
    config: config as ReadConfigResult,
    reload,
  }), [config, reload])

  return (
    <ConfigContext.Provider
      value={value}
    >
      {!!config && children}
    </ConfigContext.Provider>
  )
}

export { ConfigProvider }
