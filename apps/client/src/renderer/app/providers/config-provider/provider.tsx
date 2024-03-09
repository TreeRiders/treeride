import type { FC, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getConfig, reloadConfig } from '@entities/config'
import type { ReadConfigResult } from '@root/config/types'
import type { ConfigContextValue } from './context'
import { ConfigContext } from './context'

type ConfigProviderProps = PropsWithChildren

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const queryClient = useQueryClient()

  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: getConfig,
  })

  const { mutate: reload } = useMutation({
    mutationKey: ['reload-config'],
    mutationFn: reloadConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['config'] })
    },
  })

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
