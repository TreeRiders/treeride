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
import { pathKeys } from '@shared/lib/react-router'
import { useMainer } from '@shared/mainer'

const SettingsDropdown: FC = () => {
  const navigate = useNavigate()

  const { exit } = useMainer()

  const handleGoSettings = () => {
    navigate(pathKeys.settings())
  }

  const handleGoHello = () => {
    navigate(pathKeys.hello())
  }

  const handleExit = () => {
    exit()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
      >
        <Button
          size="action"
          variant="action"
        >
          Settings
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

export { SettingsDropdown }
