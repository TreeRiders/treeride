import { existsSync, mkdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { resolve } from 'node:path'

export const getTreerideConfigPath = () => {
  const homeDirectory = homedir()
  const treerideConfigPath = resolve(homeDirectory, '.config', 'treeride')
  if (!existsSync(treerideConfigPath)) {
    mkdirSync(treerideConfigPath, { recursive: true })
  }
  return treerideConfigPath
}
