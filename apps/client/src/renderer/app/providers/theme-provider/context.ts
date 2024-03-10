import { createContext, useContext } from 'react'
import type { ThemeSchema } from '@root/schemas'

interface ThemeContextValue {
  darkThemes: ThemeSchema[]
  lightThemes: ThemeSchema[]
  appearance: 'light' | 'dark'
  currentLightTheme: ThemeSchema
  currentDarkTheme: ThemeSchema
  currentTheme: ThemeSchema
}

const ThemeContext = createContext<ThemeContextValue>({} as ThemeContextValue)

const useTheme = () => useContext(ThemeContext)

export { ThemeContext, type ThemeContextValue, useTheme }
