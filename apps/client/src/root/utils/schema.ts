import { readFileSync, writeFileSync } from 'node:fs'
import { parse, stringify } from 'yaml'
import type { ZodSchema } from 'zod'

const readConfigFile = <TSchema extends ZodSchema>(path: string, schema: TSchema): TSchema['_output'] => {
  const fileContent = readFileSync(path, 'utf-8')
  const parsedFileContent = parse(fileContent)
  const parsedConfig = schema.parse(parsedFileContent)

  return parsedConfig
}

const saveConfigFile = <TSchema extends ZodSchema>(path: string, schema: TSchema, config: TSchema['_output']): void => {
  const stringifiedConfig = stringify(schema.parse(config))
  writeFileSync(path, stringifiedConfig)
}

export { readConfigFile, saveConfigFile }
