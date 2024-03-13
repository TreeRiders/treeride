import type { ChangeSettingsPayload, GetExtensionsResult, GetSettingsResult } from '@root/config/types'
import type { windowSizes } from '@root/window'
import type { IpcMainInvokeEvent } from 'electron'
import { ipcMain } from 'electron'

interface IPCHandlers {
  'get-settings': () => GetSettingsResult
  'get-extensions': () => GetExtensionsResult
  'reload-settings': () => void
  'reload-extensions': () => void
  'change-settings': (newSettings: ChangeSettingsPayload) => void
  'change-window-size': (size: keyof typeof windowSizes) => void
  'exit-app': () => void
}

interface IPCEvents {
  'new-settings': () => void
  'new-extensions': () => void
}

export interface TypedIPCRenderer {
  invoke: <T extends keyof IPCHandlers, S = Parameters<IPCHandlers[T]>[0]>(
    event: T,
    payload: S extends undefined ? null : S
  ) => ReturnType<IPCHandlers[T]>
  receive: <T extends keyof IPCEvents>(
    event: T,
    listener: IPCEvents[T]
  ) => () => void
}

ipcMain.handle('get-extensions', () => {})

export interface TypedIPCMain {
  handle: <T extends keyof IPCHandlers>(
    event: T, listener: (event: IpcMainInvokeEvent,
      payload: Parameters<IPCHandlers[T]>[0]) => ReturnType<IPCHandlers[T]>
  ) => void
  on: <T extends keyof IPCEvents>(event: T, listener: IPCEvents[T]) => void
  send: <T extends keyof IPCEvents>(event: T) => void
}
