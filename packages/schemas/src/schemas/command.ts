import { z } from 'zod'

const commandSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  mode: z.enum(['view']),
})

type CommandSchema = z.infer<typeof commandSchema>

export { commandSchema, type CommandSchema }
