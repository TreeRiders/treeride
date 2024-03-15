import type { exposeApiToGlobalWindow } from '../main/ipcs/ipcs'

declare global {
  interface Window {
    api: ReturnType<typeof exposeApiToGlobalWindow>['api']
  }
}
