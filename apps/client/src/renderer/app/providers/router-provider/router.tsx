import { Navigate, createBrowserRouter } from 'react-router-dom'
import { mainRoute } from '@pages/main'
import { pathKeys } from '@shared/lib/react-router'
import { helloRoute } from '@pages/hello'
import { settingsRoute } from '@pages/settings'
import { extensionsSettingsRoute } from '@pages/extensions-settings'
import { RootLayout } from '@widgets/root-layout'
import { initRoute } from '@pages/init'
import { appearanceSettingsRoute } from '@pages/appearance-settings'
import { systemSettingsRoute } from '@pages/system-settings'

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  [
    {
      element: (
        <RootLayout />
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
