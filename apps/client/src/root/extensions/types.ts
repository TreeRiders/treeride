import type { CommandSchema, ExtensionSchema, ThemeSchema } from '@treeride/schemas'

export interface Extension extends ExtensionSchema {
  themes: ThemeSchema[]
  commands: CommandSchema[]
}
