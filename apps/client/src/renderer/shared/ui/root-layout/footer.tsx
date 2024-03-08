import type { FC, ReactNode } from 'react'

interface RootLayoutFooterProps {
  settings: ReactNode
}

const RootLayoutFooter: FC<RootLayoutFooterProps> = ({ settings }) => {
  return (
    <div
      className="h-10 px-2 flex-shrink-0 border-t border-solid draggable flex items-center backdrop-opacity-60"
    >
      {settings}
    </div>
  )
}

export { RootLayoutFooter }
