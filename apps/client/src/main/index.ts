import process from 'node:process'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app } from 'electron'
import { windowSizes } from '@root/window'
import { createWindow as createMainWindow } from './windows/main'
import { createTray } from './tray'
import { Settings } from './config/settings'
import { Extensions } from './config/extensions'
import { ipcMain } from './ipcs/ipcs'
import { getConfigResult } from './config/result'

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

  ipcMain.handle.getConfig(async () => {
    return getConfigResult(settings, extensions)
  })

  ipcMain.handle.reloadConfig(async () => {
    settings.read()
    extensions.read()
  })

  ipcMain.handle.changeSettings(async (_, { data }) => {
    settings.write(data)
    return getConfigResult(settings, extensions)
  })

  ipcMain.handle.exitApp(async () => {
    app.exit(0)
  })

  ipcMain.handle.changeWindowSize(async (_, { data }) => {
    const window = BrowserWindow.getFocusedWindow()
    window?.setResizable(true)
    window?.setSize(windowSizes[data].width, windowSizes[data].height)
    window?.setResizable(false)
    window?.center()
  })

  createMainWindow()
  createTray()
})
