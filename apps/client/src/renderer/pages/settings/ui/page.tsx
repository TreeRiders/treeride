import { WidePane } from '@shared/ui'
import { DynamicLayoutBaseSet } from '@widgets/dynamic-layout'
import { SettingsTabs } from '@widgets/settings'
import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

const SettingsPage: FC = () => {
  return (
    <WidePane>
      <DynamicLayoutBaseSet />
      <div
        className="flex-1 gap-4 flex flex-col"
      >
        <SettingsTabs />
        <Outlet />
      </div>
    </WidePane>
  )
}

export { SettingsPage }
