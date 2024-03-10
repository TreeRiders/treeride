import { useConfig } from '@app/providers/config-provider'
import type { CommandSchema } from '@root/schemas'
import { pathKeys } from '@shared/lib/react-router'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from '@treeride/ui'
import { DynamicLayout } from '@widgets/root-layout'
import { useMemo } from 'react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage: FC = () => {
  const config = useConfig()

  const navigate = useNavigate()

  const items = useMemo((): CommandSchema[] => {
    const commands: CommandSchema[] = []
    config.config.extensions.forEach((extension) => {
      commands.push(...extension.commands)
    })
    return commands
  }, [config.config.extensions])

  const handleOpenSettings = () => {
    navigate(pathKeys.settings())
  }

  return (
    <Command>
      <DynamicLayout.HeaderSearch
        placeholder="Search for apps and commands..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup
          heading="Commands"
        >
          {items.map((item) => {
            return (
              <CommandItem
                key={item.name}
              >
                {item.title}
              </CommandItem>
            )
          })}
        </CommandGroup>
        <CommandGroup
          heading="Settings"
        >
          <CommandItem
            onSelect={handleOpenSettings}
          >
            Open settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export { MainPage }
