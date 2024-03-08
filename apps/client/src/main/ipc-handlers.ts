import type { ReadConfigResult } from '@root/config/types'
import { app, ipcMain } from 'electron'

interface SetIPCHandlersPayload {
  config: ReadConfigResult
}

const setIPCHandlers = (payload: SetIPCHandlersPayload) => {
  const { config } = payload

  ipcMain.handle('get-config', () => {
    return config
  })

  ipcMain.on('exit-app', () => {
    app.exit(0)
  })
}

export { setIPCHandlers }
