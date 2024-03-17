import type { SettingsSchema } from '@treeride/schemas/schemas'
import { BrowserWindow, globalShortcut } from 'electron'
import { logger } from './logger'

export const registerHotkeys = (settings: SettingsSchema) => {
  globalShortcut.register(settings.hotkeys.global, () => {
    const currentWindow = BrowserWindow.getAllWindows()[0]

    if (currentWindow.isVisible()) {
      currentWindow.hide()
    }
    else {
      currentWindow.show()
    }
  })

  logger.debug('[Hotkeys]: Registered hotkeys')
}

export const unregisterHotkeys = () => {
  globalShortcut.unregisterAll()
  logger.debug('[Hotkeys]: Unregistered hotkeys')
}
