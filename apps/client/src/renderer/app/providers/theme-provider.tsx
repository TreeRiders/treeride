import { useCallback, useMemo } from 'react'
import type { FC, PropsWithChildren } from 'react'
import type { ThemeSchema } from '@root/schemas'
import { useConfig } from '@entities/config'
import type { ThemeContextValue } from '@entities/theme'
import { ThemeContext, defaultDarkTheme, defaultLightTheme } from '@entities/theme'

type ThemeProviderProps = PropsWithChildren

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { settings, extensions } = useConfig()

  const darkThemes = useMemo(() => {
    return extensions.extensions.reduce<ThemeSchema[]>((acc, extension) => {
      const themes = extension.themes.filter(theme => theme.appearance === 'dark')
      return [...acc, ...themes]
    }, [])
  }, [extensions.extensions])

  const lightThemes = useMemo(() => {
    return extensions.extensions.reduce<ThemeSchema[]>((acc, extension) => {
      const themes = extension.themes.filter(theme => theme.appearance === 'light')
      return [...acc, ...themes]
    }, [])
  }, [extensions.extensions])

  const currentDarkTheme = useMemo(() => {
    return darkThemes.find(theme => theme.name === settings.settings.appearance.darkTheme) ?? defaultDarkTheme
  }, [settings.settings.appearance.darkTheme, darkThemes])

  const currentLightTheme = useMemo(() => {
    return lightThemes.find(theme => theme.name === settings.settings.appearance.lightTheme) ?? defaultLightTheme
  }, [settings.settings.appearance.lightTheme, lightThemes])

  const getAppearance = useCallback(() => {
    if (settings.settings.appearance.appearance === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    return settings.settings.appearance.appearance
  }, [settings.settings.appearance.appearance])

  const currentTheme = useMemo(() => {
    return getAppearance() === 'dark' ? currentDarkTheme : currentLightTheme
  }, [currentDarkTheme, currentLightTheme, getAppearance])

  const value = useMemo<ThemeContextValue>(() => (
    {
      darkThemes,
      lightThemes,
      appearance: getAppearance(),
      currentDarkTheme,
      currentLightTheme,
      currentTheme,
      useSystemAppearance: settings.settings.appearance.appearance === 'system',
    }
  ), [settings.settings.appearance.appearance, currentDarkTheme, currentLightTheme, currentTheme, darkThemes, getAppearance, lightThemes])

  return (
    <ThemeContext.Provider
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
