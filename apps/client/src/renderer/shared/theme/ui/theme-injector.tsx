import { type FC, useEffect } from 'react'
import { useTheme } from '@app/providers/theme-provider'
import { themeToCSS } from '../utils/theme-to-css'

const ThemeInjector: FC = () => {
  const { currentTheme } = useTheme()

  useEffect(() => {
    const [_, css] = themeToCSS(currentTheme)
    const style = document.createElement('style')
    style.id = 'theme-injector-tokens'
    style.innerHTML = css
    document.head.appendChild(style)

    return () => {
      const style = document.getElementById('theme-injector-tokens')
      if (style) {
        style.remove()
      }
    }
  }, [currentTheme])

  return null
}

export { ThemeInjector }
