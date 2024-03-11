import type { ReadConfigResult } from '@root/config/types'
import type { windowSizes } from '@root/window'

interface IPCHandlers {
  'get-config': {
    value: void
    result: ReadConfigResult
  }
  'reload-config': {
    value: void
    result: void
  }
  'change-window-size': {
    value: keyof typeof windowSizes
    result: void
  }
}

export { type IPCHandlers }
