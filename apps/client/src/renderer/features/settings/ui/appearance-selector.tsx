import { Section, SectionContent, SectionTitle, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Separator } from '@treeride/ui'
import type { FC } from 'react'

interface AppearanceSelectorProps {
  currentAppearance: string
  onSelect: (value: string) => void
}

const AppearanceSelector: FC<AppearanceSelectorProps> = ({ currentAppearance, onSelect }) => {
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
        value={currentAppearance}
        onValueChange={onSelect}
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
