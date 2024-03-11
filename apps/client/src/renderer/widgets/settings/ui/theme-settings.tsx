import { AppearanceSelector } from '@features/theme/select-appearance'
import { ThemeSelector } from '@features/theme/select-theme'
import type { FC } from 'react'

export const ThemeSettings: FC = () => {
  return (
    <div
      className="flex flex-col gap-6 flex-1"
    >
      <ThemeSelector
        appearance="light"
      />
      <ThemeSelector
        appearance="dark"
      />
      <AppearanceSelector />
    </div>
  )
}
