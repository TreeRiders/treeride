import { useConfig } from '@entities/config'
import { useRunExtension } from '@entities/extension'
import { Search } from '@features/dynamic-layout/command-search'
import { pathKeys } from '@shared/lib/router'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@treeride/ui'
import { DynamicLayoutBaseSet, HeaderSearch } from '@widgets/dynamic-layout'
import { Fragment } from 'react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage: FC = () => {
  const { extensions } = useConfig()

  const { run } = useRunExtension()

  const navigate = useNavigate()

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
          {extensions.map((extension) => {
            return (
              <Fragment
                key={extension.name}
              >
                {extension.commands.map((command) => {
                  return (
                    <CommandItem
                      className="flex items-center justify-between"
                      key={command.name}
                      onSelect={() => {
                        run({
                          extensionName: extension.name,
                          commandName: command.name,
                        })
                      }}
                    >
                      <span>{command.title}</span>
                      <span>Command</span>
                    </CommandItem>
                  )
                })}
              </Fragment>
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
