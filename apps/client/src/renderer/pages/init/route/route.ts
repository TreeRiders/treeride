import { createElement } from 'react'
import type { RouteObject } from 'react-router-dom'
import { pathKeys } from '@shared/lib/router'
import { InitPage } from '../ui/page'

const initRoute: RouteObject = {
  path: pathKeys.init(),
  element: createElement(InitPage),
}

export { initRoute }
