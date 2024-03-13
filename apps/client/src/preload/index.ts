import process from 'node:process'
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import type { TypedIPCRenderer } from '@root/ipc'
import type { CustomAPI } from './api'

const typedIPCRenderer = ipcRenderer as unknown as TypedIPCRenderer

const send: CustomAPI['send'] = (event, payload) => {
  return typedIPCRenderer.invoke(event, payload)
}

const receive: CustomAPI['receive'] = (event, listener) => {
  ipcRenderer.on(event, listener)
  return () => {
    ipcRenderer.removeListener(event, listener)
  }
}

const api: CustomAPI = {
  send,
  receive,
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
