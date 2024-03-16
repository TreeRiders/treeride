import { useCallback, useMemo } from 'react'
import type { FC, PropsWithChildren } from 'react'
import { useConfig } from '@entities/config'
import type { ThemeContextValue } from '@entities/theme'
import { ThemeContext, defaultDarkTheme, defaultLightTheme } from '@entities/theme'

type ThemeProviderProps = PropsWithChildren

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const { settings, themes } = useConfig()

  const darkThemes = useMemo(() => {
    return themes.filter(theme => theme.appearance === 'dark')
  }, [themes])

  const lightThemes = useMemo(() => {
    return themes.filter(theme => theme.appearance === 'light')
  }, [themes])

  const currentDarkTheme = useMemo(() => {
    return darkThemes.find(theme => theme.name === settings.appearance.darkTheme) ?? defaultDarkTheme
  }, [settings.appearance.darkTheme, darkThemes])

  const currentLightTheme = useMemo(() => {
    return lightThemes.find(theme => theme.name === settings.appearance.lightTheme) ?? defaultLightTheme
  }, [settings.appearance.lightTheme, lightThemes])

  const getAppearance = useCallback(() => {
    if (settings.appearance.appearance === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    return settings.appearance.appearance
  }, [settings.appearance.appearance])

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
      useSystemAppearance: settings.appearance.appearance === 'system',
    }
  ), [settings.appearance.appearance, currentDarkTheme, currentLightTheme, currentTheme, darkThemes, getAppearance, lightThemes])

  return (
    <ThemeContext.Provider
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider }
