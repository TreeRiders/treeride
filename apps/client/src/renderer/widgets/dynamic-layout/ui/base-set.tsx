import type { FC } from 'react'
import { Action } from '@treeride/ui'
import { RefreshCwIcon } from 'lucide-react'
import { useConfig } from '@entities/config'
import { Navigator } from '@features/dynamic-layout/navigator'
import { GoBack } from '@features/dynamic-layout/go-back'
import { InitErrorsIndicator } from '@features/dynamic-layout/init-errors-indicator'
import { FooterLeftActions } from './footer-left-actions'
import { FooterRightActions } from './footer-right-actions'
import { HeaderActions } from './header-actions'

export const DynamicLayoutBaseSet: FC = () => {
  const { extensions, settings, reloadExtensions, reloadSettings } = useConfig()

  const errors = [...settings.errors, ...extensions.errors]

  const handleReload = () => {
    reloadExtensions()
    reloadSettings()
  }

  return (
    <>
      <HeaderActions>
        <GoBack />
      </HeaderActions>
      <FooterLeftActions>
        <Navigator />
        <InitErrorsIndicator />
      </FooterLeftActions>
      <FooterRightActions>
        {!!errors.length && (
          <Action
            description="Reload the app to reinitialize the extensions."
            icon={<RefreshCwIcon />}
            title="Reload"
            onClick={handleReload}
          />
        )}
      </FooterRightActions>
    </>
  )
}
