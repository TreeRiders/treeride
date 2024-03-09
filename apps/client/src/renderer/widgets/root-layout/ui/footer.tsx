import { InitErrors } from '@features/layout'
import { SettingsDropdown } from '@features/settings'
import type { FC } from 'react'

const RootLayoutFooter: FC = () => {
  return (
    <div
      className="h-10 px-2 flex-shrink-0 border-t border-solid draggable flex items-center backdrop-opacity-60 justify-between"
    >
      <div
        className="flex items-center gap-1 non-draggable"
      >
        <SettingsDropdown />
        <InitErrors />
      </div>
      <div
        className="flex items-center gap-2"
        id="footer-actions"
      />
    </div>
  )
}

export { RootLayoutFooter }
