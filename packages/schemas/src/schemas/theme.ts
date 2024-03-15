import { z } from 'zod'

const themeSchema = z.object({
  name: z.string(),
  title: z.string(),
  appearance: z.enum(['light', 'dark']),
  colors: z.object({
    backgroundPrimary: z.string(),
    backgroundSecondary: z.string(),
    foreground: z.string(),
    selection: z.string(),
    blink: z.string(),
    warning: z.string().optional().default('#EF9F76'),
    error: z.string().optional().default('#E78284'),
  }),
})

type ThemeSchema = z.infer<typeof themeSchema>

export { themeSchema, type ThemeSchema }
