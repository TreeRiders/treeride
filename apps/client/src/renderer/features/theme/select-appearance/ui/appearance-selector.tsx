import { useConfig } from '@entities/config'
import { useTheme } from '@entities/theme'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@treeride/ui'
import type { FC } from 'react'

const AppearanceSelector: FC = () => {
  const { appearance, useSystemAppearance } = useTheme()

  const { changeSettings } = useConfig()

  return (
    <div
      className="flex flex-1 items-center justify-center flex-col gap-6"
    >
      <div
        className="font-light text-4xl"
      >
        Select appearance
      </div>
      <Select
        value={useSystemAppearance ? 'system' : appearance}
        onValueChange={value => changeSettings({
          path: 'appearance.appearance',
          value,
        })}
      >
        <SelectTrigger
          className="w-[200px]"
        >
          <SelectValue
            placeholder="Select a appearance"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Appearance</SelectLabel>
            <SelectItem
              value="light"
            >
              Light
            </SelectItem>
            <SelectItem
              value="dark"
            >
              Dark
            </SelectItem>
            <SelectItem
              value="system"
            >
              System
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export { AppearanceSelector }
