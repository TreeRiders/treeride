import type { InitError } from '@root/config/errors'
import type { RunExtensionPayload } from '@root/extensions'
import type { ChangeSettingsPayload } from '@root/settings/types'
import type { windowSizes } from '@root/window'
import type { ExtensionSchema, SettingsSchema, ThemeSchema } from '@treeride/schemas/schemas'
import { settingsSchema } from '@treeride/schemas/schemas'
import { createInterprocess } from 'interprocess'

export const { exposeApiToGlobalWindow, ipcMain, ipcRenderer }
  = createInterprocess({
    main: {
      getSettings: async (): Promise<SettingsSchema> => settingsSchema.parse({}),
      getExtensions: async (): Promise<ExtensionSchema[]> => [],
      getThemes: async (): Promise<ThemeSchema[]> => [],
      getInitErrors: async (): Promise<InitError[]> => [],
      getIsFirstRun: async (): Promise<boolean> => false,
      exitApp: async () => {},
      changeSettings: async (_, _data: ChangeSettingsPayload): Promise<void> => {},
      changeWindowSize: async (_, _data: keyof typeof windowSizes) => {},
      reloadConfig: async () => {},
      runExtension: async (_, _data: RunExtensionPayload) => {},
    },
    renderer: {},
  })
