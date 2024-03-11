import * as React from 'react'
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '.'
import { cn } from '@/lib'

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  title: string
  description: string
  onClick: () => void
}

export const Action = React.forwardRef<HTMLButtonElement, ActionProps>(({ title, icon, className, description, onClick }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
        >
          <Button
            className={cn('non-draggable', className)}
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
  )
})

Action.displayName = 'Action'
