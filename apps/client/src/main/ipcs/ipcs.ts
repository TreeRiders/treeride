import type { GetConfigResult } from '@root/config/types'
import { settingsSchema } from '@root/schemas'
import type { ChangeSettingsPayload } from '@root/settings/types'
import type { windowSizes } from '@root/window'
import { createInterprocess } from 'interprocess'

export const { exposeApiToGlobalWindow, ipcMain, ipcRenderer }
  = createInterprocess({
    main: {
      getConfig: async (): Promise<GetConfigResult> => {
        return {
          settings: settingsSchema.parse({}),
          extensions: [],
          errors: [],
        }
      },
      exitApp: async () => {},
      changeSettings: async (_, _data: ChangeSettingsPayload): Promise<GetConfigResult> => {
        return {
          settings: settingsSchema.parse({}),
          extensions: [],
          errors: [],
        }
      },
      changeWindowSize: async (_, _data: keyof typeof windowSizes) => {},
      reloadConfig: async () => {},
    },
    renderer: {},
  })
