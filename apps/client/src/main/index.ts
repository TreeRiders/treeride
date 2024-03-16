import process from 'node:process'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app } from 'electron'
import { windowSizes } from '@root/window'
import { createWindow as createMainWindow } from './windows/main'
import { createTray } from './tray'

import { ipcMain } from './ipcs/ipcs'
import { registerHotkeys, unregisterHotkeys } from './hotkeys'
import { changeSettings, readSettings } from './config/settings'
import { preflightConfig } from './config/config'
import { readThemes } from './config/themes'
import { readExtensions } from './config/extensions'

app.whenReady().then(() => {
  const preflightResult = preflightConfig()
  let settings = readSettings()
  let themes = readThemes()
  let extensions = readExtensions()

  const settingsErrors = [...settings.errors]
  const themesErrors = [...themes.errors]
  const extensionsErrors = [...extensions.errors]

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

  ipcMain.handle.getSettings(async () => {
    unregisterHotkeys()
    registerHotkeys(settings.settings)
    return settings.settings
  })

  ipcMain.handle.getExtensions(async () => extensions.extensions)

  ipcMain.handle.getThemes(async () => themes.themes)

  ipcMain.handle.getInitErrors(async () => [
    ...settingsErrors,
    ...themesErrors,
    ...extensionsErrors,
  ])

  ipcMain.handle.getIsFirstRun(async () => preflightResult.isFirstRun)

  ipcMain.handle.reloadConfig(async () => {
    settings = readSettings()
    extensions = readExtensions()
    themes = readThemes()
  })

  ipcMain.handle.changeSettings(async (_, { data }) => {
    const result = changeSettings(data)
    settings = {
      settings: result.settings,
      errors: result.error ? [result.error] : [],
    }
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

  registerHotkeys(settings.settings)
})
