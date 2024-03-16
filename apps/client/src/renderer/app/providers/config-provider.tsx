import { type FC, type PropsWithChildren, useMemo } from 'react'
import type { ConfigContextValue } from '@entities/config'
import { ConfigContext, changeSettings, getExtensions, getInitErrors, getSettings, getThemes, reloadConfig } from '@entities/config'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { settingsSchema } from '@treeride/schemas/schemas'

type ConfigProviderProps = PropsWithChildren

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const queryClient = useQueryClient()

  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })

  const { data: extensions } = useQuery({
    queryKey: ['extensions'],
    queryFn: getExtensions,
  })

  const { data: themes } = useQuery({
    queryKey: ['themes'],
    queryFn: getThemes,
  })

  const { data: initErrors } = useQuery({
    queryKey: ['init-errors'],
    queryFn: getInitErrors,
  })

  const { mutate: change } = useMutation({
    mutationFn: changeSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      })
    },
  })

  const { mutate: reload } = useMutation({
    mutationFn: reloadConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings', 'themes', 'extensions', 'init-errors'],
      })
    },
  })

  const value = useMemo<ConfigContextValue>(() => ({
    settings: settings ?? settingsSchema.parse({}),
    errors: initErrors ?? [],
    extensions: extensions ?? [],
    themes: themes ?? [],
    changeSettings: change,
    reload,
  }), [change, extensions, initErrors, reload, settings, themes])

  return (
    <ConfigContext.Provider
      value={value}
    >
      {!!settings && !!themes && !!extensions && children }
    </ConfigContext.Provider>
  )
}

export { ConfigProvider }
