import { useTheme } from '@app/providers/theme-provider'
import { AppearanceSelector, ThemeSwitcher } from '@features/settings'
import { darkTheme, lightTheme } from '@shared/theme'
import type { FC } from 'react'

const ThemeSettings: FC = () => {
  const { lightThemes, darkThemes, currentDarkTheme, currentLightTheme, appearance } = useTheme()

  return (
    <div
      className="flex flex-col gap-6 flex-1"
    >
      <ThemeSwitcher
        currentTheme={currentLightTheme}
        defaultTheme={lightTheme}
        themes={lightThemes}
        title="Light Themes"
      />
      <ThemeSwitcher
        currentTheme={currentDarkTheme}
        defaultTheme={darkTheme}
        themes={darkThemes}
        title="Dark Themes"
      />
      <AppearanceSelector
        currentAppearance={appearance}
      />
    </div>
  )
}

export { ThemeSettings }
