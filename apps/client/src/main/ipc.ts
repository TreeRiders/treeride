import type { TypedIPCMain } from '@root/ipc'
import { ipcMain } from 'electron'

export const typedIPCMain = ipcMain as unknown as TypedIPCMain
