import { z } from 'zod'

const settingsSchema = z
  .object({
    appearance: z
      .object({
        lightTheme: z.string().default('TreeRide Light'),
        darkTheme: z.string().default('TreeRide Dark'),
        appearance: z.enum(['light', 'dark', 'system']).default('system'),
      })
      .default({}),
    hotkeys: z
      .object({
        global: z.string().default(''),
      })
      .default({}),
    system: z
      .object({
        autoStart: z.boolean().default(false),
        autoHide: z.boolean().default(true),
      })
      .default({}),
  })
  .default({})

type SettingsSchema = z.infer<typeof settingsSchema>

export { settingsSchema, type SettingsSchema }
