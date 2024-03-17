import { existsSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import esbuild from 'esbuild'
import type { ExtensionSchema } from '@treeride/schemas/schemas'
import { extensionSchema } from '@treeride/schemas/schemas'
import fsExtra from 'fs-extra/esm'
import { readConfigFile } from '@treeride/schemas/utils'
import { resolveExtension } from '@treeride/resolver'

const getExtensionManifestLocation = () => resolve(cwd(), 'extension.yml')

export const readExtension = () => {
  try {
    return readConfigFile(getExtensionManifestLocation(), extensionSchema)
  }
  catch {
    return extensionSchema.parse({})
  }
}

export const getCommandsBuilders = (extension: ExtensionSchema) => {
  return extension.commands.map((command) => {
    return new Promise((res, rej) => {
      const entry = resolve(cwd(), 'src', `${command.name}.tsx`)
      const out = resolve(cwd(), 'dist', `${command.name}.js`)

      if (!existsSync(entry)) {
        rej(new Error(`Command entry file not found: ${entry}`))
      }

      esbuild.build({
        entryPoints: [
          entry,
        ],
        bundle: true,
        platform: 'node',
        format: 'cjs',
        outfile: out,
        external: ['react'],
        jsx: 'transform',
        jsxFactory: '_jsx',
        jsxFragment: '_jsxFragment',
        tsconfig: resolve(cwd(), 'tsconfig.json'),
        minify: true,
      }).then(res).catch(rej)
    })
  })
}

export const buildCommands = async (builders: Promise<unknown>[]) => {
  await Promise.all(builders)
}

export const postBuild = (extension: ExtensionSchema) => {
  const dist = resolve(cwd(), 'dist')
  const newDist = resolve(cwd(), extension.name)
  fsExtra.copySync(dist, newDist, { overwrite: true })
  fsExtra.copySync(getExtensionManifestLocation(), resolve(newDist, 'extension.yml'), { overwrite: true })

  const newExtensionPath = resolveExtension(extension.name)
  fsExtra.moveSync(newDist, newExtensionPath, { overwrite: true })
  rmSync(dist, { recursive: true, force: true })
}
