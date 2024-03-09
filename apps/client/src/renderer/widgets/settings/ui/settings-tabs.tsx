import { pathKeys } from '@shared/lib/react-router'
import { Tabs, TabsList, TabsTrigger } from '@treeride/ui'
import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const SettingsTabs: FC = () => {
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const tabs = [
    {
      label: 'Appearance',
      value: pathKeys.appearanceSettings(),
    },
    {
      label: 'Extensions',
      value: pathKeys.extensionsSettings(),
    },
    {
      label: 'System',
      value: pathKeys.systemSettings(),
    },
  ]

  return (
    <Tabs
      className="w-full flex justify-center"
      defaultValue="account"
      value={pathname}
      onValueChange={value => navigate(value)}
    >
      <TabsList
        className="w-full"
      >
        {tabs.map(tab => (
          <TabsTrigger
            className="flex-1"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export { SettingsTabs }
