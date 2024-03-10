import { ThemeSettings } from '@widgets/settings'
import type { FC } from 'react'

const AppearanceSettingsPage: FC = () => {
  return (
    <div
      className="flex flex-1 gap-4"
    >
      <ThemeSettings />
    </div>
  )
}

export { AppearanceSettingsPage }
