import { pathKeys } from '@shared/lib/router'
import { Button } from '@treeride/ui'
import { ArrowLeftIcon } from 'lucide-react'
import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const GoBack: FC = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const handleGoBack = () => navigate(pathKeys.main())

  if (pathname === pathKeys.main()) {
    return null
  }

  return (
    <Button
      size="icon"
      variant="default"
      onClick={handleGoBack}
    >
      <ArrowLeftIcon />
    </Button>
  )
}

export { GoBack }
