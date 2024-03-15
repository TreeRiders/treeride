import type { SettingsSchema } from '@root/schemas'
import { BrowserWindow, globalShortcut } from 'electron'

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
}

export const unregisterHotkeys = () => {
  globalShortcut.unregisterAll()
}
