import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

interface RootLayoutProps {
  header: ReactNode
  footer: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ header, footer }) => {
  return (
    <div
      className="h-screen flex flex-col"
    >
      {header}
      <div
        className="flex flex-col flex-1 p-2"
      >
        <Outlet />
      </div>
      {footer}
    </div>
  )
}

export { RootLayout }
