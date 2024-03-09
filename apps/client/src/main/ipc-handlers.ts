import { app, ipcMain } from 'electron'
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

  ipcMain.on('exit-app', () => {
    app.exit(0)
  })
}

export { setIPCHandlers }
