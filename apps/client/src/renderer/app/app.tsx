import type { FC } from 'react'
import { QueryProvider } from './providers/query-provider'
import { RouterProvider } from './providers/router-provider'

const App: FC = () => {
  return (
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  )
}

export { App }
