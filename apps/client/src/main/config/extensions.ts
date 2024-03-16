import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'
import { type ExtensionSchema, extensionSchema } from '@treeride/schemas/schemas'
import { app } from 'electron'
import type { ExtensionInitError } from '@root/config/errors'
import { readConfigFile } from '@treeride/schemas/utils'

interface ReadExtensionsResult {
  extensions: ExtensionSchema[]
  errors: ExtensionInitError[]
}

export const readExtensions = (): ReadExtensionsResult => {
  const extensionsPath = resolve(app.getPath('home'), '.config', 'treeride', 'extensions')
  const errors: ExtensionInitError[] = []
  const extensions: ExtensionSchema[] = []

  readdirSync(extensionsPath).forEach((extensionFolder) => {
    const extensionPath = resolve(extensionsPath, extensionFolder, 'extension.yml')

    try {
      const extension = readConfigFile(extensionPath, extensionSchema)
      extensions.push(extension)
    }
    catch (error) {
      errors.push({
        extension: extensionFolder,
        message: (error as Error).message,
        type: 'extension',
      })
    }
  })

  return {
    extensions,
    errors,
  }
}
