import type { ReadConfigResult } from '@root/config/types'

interface IPCHandlers {
  'get-config': {
    value: void
    result: ReadConfigResult
  }
  'reload-config': {
    value: void
    result: void
  }
}

export { type IPCHandlers }
