import type { FC, PropsWithChildren } from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import type { ConfigContextValue } from '@entities/config'
import { ConfigContext, useChangeSettings, useGetExtensions, useGetSettings, useReloadExtensions, useReloadSettings } from '@entities/config'
import type { GetExtensionsResult, GetSettingsResult } from '@root/config/types'
import { useQueryClient } from '@tanstack/react-query'

type ConfigProviderProps = PropsWithChildren

const ConfigProvider: FC<ConfigProviderProps> = ({ children }) => {
  const client = useQueryClient()

  const { data: settings } = useGetSettings()

  const { mutate: reloadSettings } = useReloadSettings()

  const { data: extensions } = useGetExtensions()

  const { mutate: reloadExtensions } = useReloadExtensions()

  const { mutate: change } = useChangeSettings()

  const value = useMemo<ConfigContextValue>(() => ({
    settings: settings as GetSettingsResult,
    extensions: extensions as GetExtensionsResult,
    reloadSettings,
    reloadExtensions,
    changeSettings: (path, value) => change({ path, value }),
  }), [change, extensions, reloadExtensions, reloadSettings, settings])

  const invalidateSettings = useCallback(() => {
    client.invalidateQueries({ queryKey: ['settings'] })
  }, [client])

  const invalidateExtensions = useCallback(() => {
    client.invalidateQueries({ queryKey: ['extensions'] })
  }, [client])

  useEffect(() => {
    const newSettingsReceiver = window.api.receive('new-settings', invalidateSettings)
    const newExtensionsReceiver = window.api.receive('new-extensions', invalidateExtensions)

    return () => {
      newSettingsReceiver()
      newExtensionsReceiver()
    }
  }, [invalidateExtensions, invalidateSettings])

  return (
    <ConfigContext.Provider
      value={value}
    >
      {!!settings?.settings && !!extensions?.extensions && children}
    </ConfigContext.Provider>
  )
}

export { ConfigProvider }
