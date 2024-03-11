import { themeToCSS } from '@entities/theme'
import type { ThemeSchema } from '@root/schemas'
import type { FC } from 'react'

interface ThemeItemProps {
  theme: ThemeSchema
  isSelected: boolean
  onClick: () => void
}

export const ThemeItem: FC<ThemeItemProps> = ({ theme, isSelected, onClick }) => {
  const [colors] = themeToCSS(theme)

  return (
    <div
      className="h-[120px] w-[200px] rounded-xl overflow-hidden flex items-center justify-center text-xl font-light cursor-pointer"
      style={{
        backgroundColor: 'var(--color-background-tinted)',
        backgroundImage: `linear-gradient(to bottom, ${colors.backgroundPrimary} 0%, ${colors.backgroundSecondary} 70%)`,
        color: colors.foreground,
        border: !isSelected ? `none` : `4px solid ${colors.selection}`,
      }}
      onClick={onClick}
    >
      <div
        style={{ color: theme.colors.foreground }}
      >
        {theme.title}
      </div>
    </div>
  )
}
