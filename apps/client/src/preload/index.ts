import process from 'node:process'
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { CustomAPI } from './api'

const doInvoke: CustomAPI['doInvoke'] = (channel, data) => {
  return ipcRenderer.invoke(channel, data)
}

const api: CustomAPI = {
  doInvoke,
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  }
  catch (error) {
    console.error(error)
  }
}
else {
  // @ts-expect-error (define in dts)
  window.electron = electronAPI
  // @ts-expect-error (define in dts)
  window.api = api
}
