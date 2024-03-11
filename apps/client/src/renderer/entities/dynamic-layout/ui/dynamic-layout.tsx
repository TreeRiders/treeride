import type { FC, PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

type DynamicLayoutProps = PropsWithChildren

export const DynamicLayout: FC<DynamicLayoutProps> = ({ children }) => {
  return (
    <div
      className="h-screen flex flex-col"
    >
      <div
        className="h-14 px-2 flex-shrink-0 border-b border-solid flex items-center"
      >
        <div
          className="flex items-center"
          id="header-left-actions"
        />
        <div
          className="flex items-center flex-1"
          id="header-search"
        />
      </div>
      <div
        className="flex flex-col flex-1 min-h-0"
      >
        <div
          className="flex flex-1 min-h-0 p-2"
        >
          <Outlet />
        </div>
      </div>
      <div
        className="h-10 px-2 flex-shrink-0 border-t border-solid draggable flex items-center backdrop-opacity-60 justify-between"
      >
        <div
          className="flex items-center gap-1 non-draggable"
          id="footer-left-actions"
        />
        <div
          className="flex items-center gap-2"
          id="footer-right-actions"
        />
      </div>
      {children}
    </div>
  )
}
