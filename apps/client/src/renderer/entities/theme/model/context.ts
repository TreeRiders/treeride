import { createContext, useContext } from 'react'
import type { ThemeSchema } from '@root/schemas'

export interface ThemeContextValue {
  darkThemes: ThemeSchema[]
  lightThemes: ThemeSchema[]
  appearance: 'light' | 'dark'
  useSystemAppearance: boolean
  currentLightTheme: ThemeSchema
  currentDarkTheme: ThemeSchema
  currentTheme: ThemeSchema
}

export const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue)

export const useTheme = () => useContext(ThemeContext)
