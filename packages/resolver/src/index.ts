import { homedir } from 'node:os'
import { resolve } from 'node:path'

export const resolveConfig = () => resolve(homedir(), '.config', 'treeride')

export const resolveSettings = () => resolve(resolveConfig(), 'settings.yml')

export const resolveExtensions = () => resolve(resolveConfig(), 'extensions')

export const resolveThemes = () => resolve(resolveConfig(), 'themes')

export const resolveExtension = (name: string) => resolve(resolveExtensions(), name)

export const resolveExtensionConfig = (name: string) => resolve(resolveExtension(name), 'extension.yml')

export const resolveTheme = (name: string) => resolve(resolveThemes(), name)

export const resolveCommand = (extension: string, command: string) => resolve(resolveExtension(extension), `${command}.js`)

export const resolveRenderChild = () => resolve(resolveConfig(), 'render-child')

export const resolveRenderChildScript = () => resolve(resolveRenderChild(), 'render-child.js')

export const resolveRenderChildVM = () => resolve(resolveRenderChild(), 'vm.js')
