import type { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type QueryProviderProps = PropsWithChildren

const queryClient = new QueryClient()

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      {children}
    </QueryClientProvider>
  )
}

export { QueryProvider }
