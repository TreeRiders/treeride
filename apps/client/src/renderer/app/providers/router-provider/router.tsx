import { Navigate, createBrowserRouter } from 'react-router-dom'
import { mainRoute } from '@pages/main'
import { pathKeys } from '@shared/lib/react-router'
import { helloRoute } from '@pages/hello'
import { themeSettingsRoute } from '@pages/theme-settings'
import { settingsRoute } from '@pages/settings'
import { extensionsSettingsRoute } from '@pages/extensions-settings'
import { RootLayout } from '@widgets/root-layout'
import { initRoute } from '@pages/init'

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
              to={pathKeys.hello()}
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
            themeSettingsRoute,
            extensionsSettingsRoute,
          ],
        },
      ],
    },
  ],
)

export { router }
