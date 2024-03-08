import { Navigate, createBrowserRouter } from 'react-router-dom'
import { mainRoute } from '@pages/main'
import { pathKeys } from '@shared/lib/react-router'
import { RootLayout, RootLayoutFooter } from '@shared/ui/root-layout'
import { helloRoute } from '@pages/hello'

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    children: [
      {
        element: <RootLayout
          footer={(
            <RootLayoutFooter
              settings={null}
            />
          )}
                 />,
        children: [
          {
            index: true,
            element: <Navigate
              to={pathKeys.hello()}
                     />,
          },
          mainRoute,
          helloRoute,
        ],
      },
    ],
  },
])

export { router }
