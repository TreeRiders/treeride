import process from 'node:process'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app } from 'electron'
import { createWindow as createMainWindow } from './windows/main'
import { createTray } from './tray'
import { setIPCHandlers } from './ipc-handlers'
import { Settings } from './config/settings'
import { Extensions } from './config/extensions'

app.whenReady().then(() => {
  const settings = new Settings()
  const extensions = new Extensions()

  settings.read()
  extensions.read()

  electronApp.setAppUserModelId('com.treeride.app')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  createMainWindow()
  createTray()
  setIPCHandlers({ settings, extensions })

  // settings.on('settings', (payload) => {
  //   typedIPCMain.send('new-settings')
  // })
})
