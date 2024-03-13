import type { TypedIPCRenderer } from '@root/ipc'

export interface CustomAPI {
  send: TypedIPCRenderer['invoke']
  receive: TypedIPCRenderer['receive']
}
