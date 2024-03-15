import process from 'node:process'
import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { exposeApiToGlobalWindow } from '../main/ipcs/ipcs'

exposeApiToGlobalWindow({
  exposeAll: true,
})

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  // @ts-expect-error (define in dts)
  window.electron = electronAPI
}
