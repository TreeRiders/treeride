import { z } from 'zod'
import { commandSchema } from '.'

export const extensionSchema = z.object({
  name: z.string(),
  title: z.string(),
  version: z.string(),
  author: z.string(),
  commands: commandSchema.array(),
})

export type ExtensionSchema = z.infer<typeof extensionSchema>
