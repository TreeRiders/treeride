import type { FC } from 'react'
import { QueryProvider } from './providers/query-provider'
import { RouterProvider } from './providers/router-provider'
import { ConfigProvider } from './providers/config-provider'

const App: FC = () => {
  return (
    <QueryProvider>
      <ConfigProvider>
        <RouterProvider />
      </ConfigProvider>
    </QueryProvider>
  )
}

export { App }
