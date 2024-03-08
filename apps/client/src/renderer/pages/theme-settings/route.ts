import { createElement } from 'react'
import type { RouteObject } from 'react-router-dom'
import { pathKeys } from '@shared/lib/react-router'
import { ThemeSettingsPage } from './ui'

const themeSettingsRoute: RouteObject = {
  path: pathKeys.themeSettings(),
  index: true,
  element: createElement(ThemeSettingsPage),
}

export { themeSettingsRoute }
