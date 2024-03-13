import { useConfig } from '@entities/config'
import { pathKeys } from '@shared/lib/router'
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@treeride/ui'
import { InfoIcon } from 'lucide-react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const InitErrorsIndicator: FC = () => {
  const navigate = useNavigate()

  const { settings, extensions } = useConfig()

  const handleGoToInit = () => navigate(pathKeys.init())

  const errors = [...settings.errors, ...extensions.errors]

  if (!errors.length) {
    return null
  }

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            asChild
          >
            <Button
              size="action-icon"
              variant="action"
              onClick={handleGoToInit}
            >
              <InfoIcon
                className="size-5 text-warning"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent
            align="start"
            side="top"
            sideOffset={10}
          >
            <p
              className="text-warning"
            >
              We have initialized with errors. Please check the logs for more information.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </div>
  )
}

export { InitErrorsIndicator }
