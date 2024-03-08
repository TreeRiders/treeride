import type { FC, ReactNode } from 'react'

interface RootLayoutFooterFooterProps {
  settings: ReactNode
}

const RootLayoutFooter: FC<RootLayoutFooterFooterProps> = ({ settings }) => {
  return (
    <div
      className="border-t border-solid p-2"
    >
      {settings}
    </div>
  )
}

export { RootLayoutFooter }
