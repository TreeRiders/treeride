import { createElement } from 'react'
import type { RouteObject } from 'react-router-dom'
import { pathKeys } from '@shared/lib/router'
import { ExtensionsSettingsPage } from '../ui/page'

const extensionsSettingsRoute: RouteObject = {
  path: pathKeys.extensionsSettings(),
  element: createElement(ExtensionsSettingsPage),
}

export { extensionsSettingsRoute }
