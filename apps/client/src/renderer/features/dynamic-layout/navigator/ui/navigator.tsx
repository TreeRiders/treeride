import type { FC } from 'react'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@treeride/ui'
import { useNavigate } from 'react-router-dom'
import { Settings2Icon } from 'lucide-react'
import { pathKeys } from '@shared/lib/router'
import { exitApp } from '@shared/lib/commands'

const Navigator: FC = () => {
  const navigate = useNavigate()

  const handleGoSettings = () => {
    navigate(pathKeys.settings())
  }

  const handleGoHello = () => {
    navigate(pathKeys.hello())
  }

  const handleExit = () => {
    exitApp()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <Button
          size="action-icon"
          variant="action"
        >
          <Settings2Icon
            className="size-5"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={15}
      >
        <DropdownMenuItem
          onClick={handleGoSettings}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleGoHello}
        >
          Hello
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleExit}
        >
          Exit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { Navigator }
