import type { RouteObject } from 'react-router-dom'
import { pathKeys } from '@shared/lib/react-router'
import { SettingsPage } from './ui/page'

const settingsRoute: RouteObject = {
  path: pathKeys.settings(),
  element: (
    <SettingsPage />
  ),
}

export { settingsRoute }
