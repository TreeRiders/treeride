import { GoBack } from '@features/layout'
import { pathKeys } from '@shared/lib/react-router'
import type { FC } from 'react'
import { useLocation } from 'react-router-dom'

const RootLayoutHeader: FC = () => {
  const { pathname } = useLocation()

  return (
    <div
      className="h-14 px-2 flex-shrink-0 border-b border-solid flex items-center"
    >
      {pathname !== pathKeys.main() && <GoBack />}
      <div
        className="flex items-center flex-1"
        id="header-search"
      />
    </div>
  )
}

export { RootLayoutHeader }
