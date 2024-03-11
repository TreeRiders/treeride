import { Navigate, createBrowserRouter } from 'react-router-dom'
import { mainRoute } from '@pages/main'
import { helloRoute } from '@pages/hello'
import { settingsRoute } from '@pages/settings'
import { extensionsSettingsRoute } from '@pages/extensions-settings'
import { initRoute } from '@pages/init'
import { appearanceSettingsRoute } from '@pages/appearance-settings'
import { systemSettingsRoute } from '@pages/system-settings'
import { pathKeys } from '@shared/lib/router'
import { DynamicLayout } from '@entities/dynamic-layout'

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  [
    {
      element: (
        <DynamicLayout />
      ),
      children: [
        {
          index: true,
          element: (
            <Navigate
              to={pathKeys.main()}
            />
          ),
        },
        initRoute,
        mainRoute,
        helloRoute,
        {
          ...settingsRoute,
          index: false,
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={pathKeys.appearanceSettings()}
                />
              ),
            },
            appearanceSettingsRoute,
            systemSettingsRoute,
            extensionsSettingsRoute,
          ],
        },
      ],
    },
  ],
)

export { router }
