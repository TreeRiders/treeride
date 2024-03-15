import type { FC, PropsWithChildren } from 'react'
import { useMemo } from 'react'
import type { ConfigContextValue } from '@entities/config'
import { ConfigContext, changeSettings, getConfig, reloadConfig } from '@entities/config'
import { settingsSchema } from '@root/schemas'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type ConfigProviderProps = PropsWithChildren

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['config'],
    queryFn: getConfig,
  })

  const { mutate: change } = useMutation({
    mutationFn: changeSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['config'] })
    },
  })

  const { mutate: reload } = useMutation({
    mutationFn: reloadConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['config'] })
    },
  })

  const value = useMemo<ConfigContextValue>(() => ({
    settings: data?.settings ?? settingsSchema.parse({}),
    extensions: data?.extensions ?? [],
    errors: data?.errors ?? [],
    reload,
    changeSettings: (path, value) => change({ path, value }),
  }), [change, data?.errors, data?.extensions, data?.settings, reload])

  return (
    <ConfigContext.Provider
      value={value}
    >
      {!!data && children }
    </ConfigContext.Provider>
  )
}

export { ConfigProvider }
