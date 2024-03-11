import { useTheme } from '@entities/theme'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@treeride/ui'
import type { FC } from 'react'

const AppearanceSelector: FC = () => {
  const { appearance } = useTheme()
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
        value={appearance}
        onValueChange={() => null}
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
