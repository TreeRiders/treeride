import { Navigate, createBrowserRouter } from 'react-router-dom'
import { mainRoute } from '@pages/main'
import { pathKeys } from '@shared/lib/react-router'
import { RootLayout } from '@shared/ui/root-layout'
import { helloRoute } from '@pages/hello'
import { SettingsDropdown } from '@features/settings'
import { themeSettingsRoute } from '@pages/theme-settings'
import { settingsRoute } from '@pages/settings'
import { extensionsSettingsRoute } from '@pages/extensions-settings'
import { RootLayoutFooter } from '@shared/ui/root-layout/footer'
import { RootLayoutHeader } from '@shared/ui/root-layout/header'

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
          header={(
            <RootLayoutHeader />
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
            extensionsSettingsRoute,
          ],
        },
      ],
    },
  ],
)

export { router }
