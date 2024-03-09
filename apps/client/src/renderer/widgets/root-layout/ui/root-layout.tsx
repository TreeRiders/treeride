import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { RootLayoutHeader } from './header'
import { RootLayoutFooter } from './footer'

const RootLayout: FC = () => {
  return (
    <div
      className="h-screen flex flex-col"
    >
      <RootLayoutHeader />
      <div
        className="flex flex-col flex-1 min-h-0"
      >
        <div
          className="flex flex-1 min-h-0 p-2"
        >
          <Outlet />
        </div>
      </div>
      <RootLayoutFooter />
    </div>
  )
}

export { RootLayout }
