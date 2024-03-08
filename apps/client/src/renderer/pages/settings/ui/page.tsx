import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

const SettingsPage: FC = () => {
  return (
    <div>
      Settings
      <Outlet />
    </div>
  )
}

export { SettingsPage }
