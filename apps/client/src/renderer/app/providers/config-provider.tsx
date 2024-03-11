import type { FC, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import type { ReadConfigResult } from '@root/config/types'
import type { ConfigContextValue } from '@entities/config'
import { ConfigContext, changeSettings, useGetConfigQuery, useReloadConfigMutation } from '@entities/config'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type ConfigProviderProps = PropsWithChildren

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const queryClient = useQueryClient()

  const { data: config } = useGetConfigQuery()

  const { mutate: reload } = useReloadConfigMutation()

  const { mutate: change } = useMutation({
    mutationKey: ['config'],
    mutationFn: changeSettings,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['config'] }),
  })

  const value = useMemo<ConfigContextValue>(() => ({
    config: config as ReadConfigResult,
    reload,
    changeSettings: (path, value) => change({ path, value }),
  }), [change, config, reload])

  return (
    <ConfigContext.Provider
      value={value}
    >
      {!!config && children}
    </ConfigContext.Provider>
  )
}

export { ConfigProvider }
