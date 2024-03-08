import { z } from 'zod'

const extensionSchema = z.object({
  name: z.string(),
  title: z.string(),
  version: z.string(),
  author: z.string(),
})

type ExtensionSchema = z.infer<typeof extensionSchema>

export { extensionSchema, type ExtensionSchema }
