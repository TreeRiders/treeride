import type { CommandSchema, ExtensionSchema, ThemeSchema } from '@root/schemas'

export interface Extension extends ExtensionSchema {
  themes: ThemeSchema[]
  commands: CommandSchema[]
}
