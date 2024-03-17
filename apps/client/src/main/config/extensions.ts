import { lstatSync, readdirSync } from 'node:fs'
import { type ExtensionSchema, extensionSchema } from '@treeride/schemas/schemas'
import type { ExtensionInitError } from '@root/config/errors'
import { readConfigFile } from '@treeride/schemas/utils'
import { resolveExtension, resolveExtensionConfig, resolveExtensions } from '@treeride/resolver'
import { logger } from '../logger'

interface ReadExtensionsResult {
  extensions: ExtensionSchema[]
  errors: ExtensionInitError[]
}

export const readExtensions = (): ReadExtensionsResult => {
  const extensionsPath = resolveExtensions()
  const errors: ExtensionInitError[] = []
  const extensions: ExtensionSchema[] = []

  readdirSync(extensionsPath).filter(element => lstatSync(resolveExtension(element)).isDirectory()).forEach((extensionFolder) => {
    const extensionPath = resolveExtensionConfig(extensionFolder)

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

  logger.debug('[Extensions]: Read extensions complete')

  return {
    extensions,
    errors,
  }
}
