import type { FC } from 'react'
import { ThemeInjector } from '@entities/theme'
import { QueryProvider } from './providers/query-provider'
import { RouterProvider } from './providers/router-provider/provider'
import { ConfigProvider } from './providers/config-provider'
import { ThemeProvider } from './providers/theme-provider'

const App: FC = () => {
  return (
    <QueryProvider>
      <ConfigProvider>
        <ThemeProvider>
          <ThemeInjector />
          <RouterProvider />
        </ThemeProvider>
      </ConfigProvider>
    </QueryProvider>
  )
}

export { App }
