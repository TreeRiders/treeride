import { resolve } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import EventEmitter from 'node:events'
import { type SettingsSchema, settingsSchema } from '@root/schemas'
import { app } from 'electron'
import { readConfigFile, saveConfigFile } from '@root/utils/schema'
import { type InitError, getInitError } from '@root/config/errors'
import objectPath from 'object-path-immutable'
import type { ChangeSettingsPayload } from '@root/settings/types'
import type TypedEventEmitter from 'typed-emitter'

type SettingsEvents = {
  'new-settings': (settings: SettingsSchema) => void
}
export class Settings extends (EventEmitter as new () => TypedEventEmitter<SettingsEvents>) {
  #settings: SettingsSchema
  #isSettingsFileExists: boolean
  #settingsPath: string
  errors: InitError[]

  get settings() {
    return this.#settings
  }

  get isFirstRun() {
    return !this.#isSettingsFileExists
  }

  constructor() {
    super()
    this.#settings = settingsSchema.parse({})
    this.#isSettingsFileExists = false
    this.#settingsPath = resolve(app.getPath('home'), '.config', 'treeride', 'settings.yml')
    this.errors = []
    this.#preflight()
  }

  #preflight() {
    if (!existsSync(this.#settingsPath)) {
      mkdirSync(this.#settingsPath, { recursive: true })
    }
    else {
      this.#isSettingsFileExists = true
    }
  }

  read() {
    this.errors = []
    try {
      this.#settings = readConfigFile(this.#settingsPath, settingsSchema)
    }
    catch (error) {
      const initError = getInitError({
        message: (error as Error).message,
      })
      this.errors.push(initError)
    }
  }

  write(payload: ChangeSettingsPayload) {
    try {
      this.#settings = settingsSchema.parse(objectPath.set(this.#settings, payload.path, payload.value))
      saveConfigFile(this.#settingsPath, settingsSchema, this.#settings)
      this.errors = []
      this.emit('new-settings', this.#settings)
    }
    catch (error) {
      const initError: InitError = {
        type: 'initSettingsError',
        message: (error as Error).message,
      }
      this.errors.push(initError)
    }
  }
}
