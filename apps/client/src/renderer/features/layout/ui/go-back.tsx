import { pathKeys } from '@shared/lib/react-router'
import { Button } from '@treeride/ui'
import { ArrowLeftIcon } from 'lucide-react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const GoBack: FC = () => {
  const navigate = useNavigate()

  const handleGoBack = () => navigate(pathKeys.main())

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