import type { ReadConfigResult } from '@root/config/types'

interface IPCHandlers {
  'get-config': {
    value: void
    result: ReadConfigResult
  }
}

export { type IPCHandlers }
