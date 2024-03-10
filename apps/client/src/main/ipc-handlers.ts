import { BrowserWindow, app, ipcMain } from 'electron'
import { windowSizes } from '@root/window'
import { readConfig } from './config/config'

const setIPCHandlers = () => {
  let config = readConfig()

  ipcMain.handle('get-config', () => {
    return config
  })

  ipcMain.handle('reload-config', () => {
    config = readConfig()

    return config
  })

  ipcMain.handle('change-window-size', (_, size: keyof typeof windowSizes) => {
    const window = BrowserWindow.getFocusedWindow()

    if (window) {
      const { width, height } = windowSizes[size]
      window.setResizable(true)
      window.setSize(width, height)
      window.center()
      window.setResizable(false)
    }
  })

  ipcMain.on('exit-app', () => {
    app.exit(0)
  })
}

export { setIPCHandlers }
