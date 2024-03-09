import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@treeride/ui'
import type { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface FooterActionProps {
  title: string
  description: string
  icon?: ReactNode
  onClick: () => void
}

const FooterAction: FC<FooterActionProps> = ({ title, description, icon, onClick }) => {
  return createPortal(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
        >
          <Button
            className="non-draggable"
            size="action"
            variant="action"
            onClick={onClick}
          >
            <div
              className="flex items-center gap-2"
            >
              {!!icon && (
                <div
                  className="size-5 flex items-center justify-center"
                >
                  {icon}
                </div>
              )}
              <span>{title}</span>
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          align="center"
          side="top"
          sideOffset={10}
        >
          <p>
            {description}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    ,
    document.getElementById('footer-actions') as HTMLElement,
  )
}

export { FooterAction }
