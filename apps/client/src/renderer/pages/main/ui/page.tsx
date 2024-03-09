import { useConfig } from '@app/providers/config-provider'
import type { CommandSchema } from '@root/schemas'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList, CommandSeparator } from '@treeride/ui'
import { DynamicLayout } from '@widgets/root-layout'
import { useMemo } from 'react'
import type { FC } from 'react'

const MainPage: FC = () => {
  const config = useConfig()

  const items = useMemo((): CommandSchema[] => {
    const commands: CommandSchema[] = []
    config.config.extensions.forEach((extension) => {
      commands.push(...extension.commands)
    })
    return commands
  }, [config.config.extensions])

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
        <CommandSeparator />
      </CommandList>
    </Command>
  )
}

export { MainPage }
