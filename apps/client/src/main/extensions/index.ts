import { existsSync } from 'node:fs'
import type { ChildProcess } from 'node:child_process'
import { fork } from 'node:child_process'
import type { RunExtensionPayload } from '@root/extensions'
import type { ExtensionSchema } from '@treeride/schemas/schemas'
import { resolveCommand, resolveRenderChildScript } from '@treeride/resolver'
import { logger } from '../logger'

export const runRenderChild = (): ChildProcess => {
  const child = fork(resolveRenderChildScript())
  logger.debug('[Extensions]: Render child started')

  child.on('message', (message: any) => {
    if (message.type === 'log') {
      logger.debug(`[From render child]: ${message.payload.message}`)
    }
  })

  return child
}

export const runExtension = (payload: RunExtensionPayload, extensions: ExtensionSchema[], renderChild: ChildProcess) => {
  const extension = extensions.find(ext => ext.name === payload.extensionName)
  if (!extension) {
    throw new Error(`Extension not found: ${payload.extensionName}`)
  }

  const command = extension.commands.find(cmd => cmd.name === payload.commandName)
  if (!command) {
    throw new Error(`Command not found: ${payload.commandName}`)
  }

  const commandScriptPath = resolveCommand(extension.name, command.name)
  if (!existsSync(commandScriptPath)) {
    throw new Error(`Command script not found: ${commandScriptPath}`)
  }

  renderChild.send({
    type: 'run',
    payload: {
      extension,
      command,
    },
  })

  logger.debug(`[Extensions]: Running command: ${command.name}`)
}
