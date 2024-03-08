import type { IPCHandlers } from '@root/ipc'

export interface CustomAPI {
  doInvoke: <T extends keyof IPCHandlers>(channel: T, data?: IPCHandlers[T]['value']) => Promise<IPCHandlers[T]['result']> | null
}
