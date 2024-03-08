import { Navigate, createBrowserRouter } from 'react-router-dom'
import { mainRoute } from '@pages/main'
import { pathKeys } from '@shared/lib/react-router'
import { RootLayout, RootLayoutFooter } from '@shared/ui/root-layout'
import { helloRoute } from '@pages/hello'
import { SettingsDropdown } from '@features/settings'
import { themeSettingsRoute } from '@pages/theme-settings'
import { settingsRoute } from '@pages/settings'

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  [
    {
      element: (
        <RootLayout
          footer={(
            <RootLayoutFooter
              settings={<SettingsDropdown />}
            />
          )}
        />
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
        mainRoute,
        helloRoute,
        {
          ...settingsRoute,
          index: false,
          children: [
            themeSettingsRoute,
          ],
        },
      ],
    },
  ],
)

export { router }
