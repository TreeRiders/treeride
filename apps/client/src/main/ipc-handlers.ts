import { BrowserWindow, app } from 'electron'
import { windowSizes } from '@root/window'
import type { GetExtensionsResult, GetSettingsResult } from '@root/config/types'
import type { Settings } from './config/settings'
import type { Extensions } from './config/extensions'
import { typedIPCMain } from './ipc'

interface SetIPCHandlersPayload {
  settings: Settings
  extensions: Extensions
}

const setIPCHandlers = (payload: SetIPCHandlersPayload) => {
  typedIPCMain.handle('get-extensions', () => {
    return {
      extensions: payload.extensions.extensions,
      errors: payload.extensions.errors,
    } as GetExtensionsResult
  })

  typedIPCMain.handle('get-settings', () => {
    return {
      settings: payload.settings.settings,
      errors: payload.settings.errors,
    } as GetSettingsResult
  })

  typedIPCMain.handle('reload-extensions', () => {
    payload.extensions.read()
  })

  typedIPCMain.handle('reload-settings', () => {
    payload.settings.read()
  })

  typedIPCMain.handle('change-settings', (_, newSettings) => {
    payload.settings.write(newSettings)
  })

  typedIPCMain.handle('change-window-size', (_, size: keyof typeof windowSizes) => {
    const window = BrowserWindow.getFocusedWindow()

    if (window) {
      const { width, height } = windowSizes[size]
      window.setResizable(true)
      window.setSize(width, height)
      window.center()
      window.setResizable(false)
    }
  })

  typedIPCMain.handle('exit-app', () => {
    app.exit(0)
  })
}

export { setIPCHandlers }
