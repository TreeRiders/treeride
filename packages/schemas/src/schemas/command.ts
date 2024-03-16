import { z } from 'zod'

export const commandSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  mode: z.enum(['view']),
})

export type CommandSchema = z.infer<typeof commandSchema>
