import { useConfig } from '@entities/config'
import { Search } from '@features/dynamic-layout/command-search'
import type { CommandSchema } from '@treeride/schemas'
import { pathKeys } from '@shared/lib/router'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@treeride/ui'
import { DynamicLayoutBaseSet, HeaderSearch } from '@widgets/dynamic-layout'
import { useMemo } from 'react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage: FC = () => {
  const { extensions } = useConfig()

  const navigate = useNavigate()

  const items = useMemo((): CommandSchema[] => {
    const commands: CommandSchema[] = []
    extensions.forEach((extension) => {
      commands.push(...extension.commands)
    })
    return commands
  }, [extensions])

  const handleOpenSettings = () => {
    navigate(pathKeys.settings())
  }
  return (
    <Command>
      <DynamicLayoutBaseSet />
      <HeaderSearch>
        <Search />
      </HeaderSearch>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup
          heading="Commands"
        >
          {items.map((item) => {
            return (
              <CommandItem
                className="flex items-center justify-between"
                key={item.name}
              >
                <span>{item.title}</span>
                <span>Command</span>
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
