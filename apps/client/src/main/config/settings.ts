import EventEmitter from 'node:events'
import { resolve } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'
import { type SettingsSchema, settingsSchema } from '@root/schemas'
import { app } from 'electron'
import { readConfigFile, saveConfigFile } from '@root/utils/schema'
import { type InitError, getInitError } from '@root/config/errors'
import type { ChangeSettingsPayload } from '@root/config/types'
import objectPath from 'object-path-immutable'

export class Settings extends EventEmitter {
  #settings: SettingsSchema
  #isSettingsFileExists: boolean
  #settingsPath: string
  errors: InitError[]

  get settings() {
    return this.#settings
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

  #sendNewSettings() {
    this.emit('settings', {
      settings: this.#settings,
      errors: this.errors,
      isFirstRun: !this.#isSettingsFileExists,
    })
  }

  read() {
    this.errors = []
    try {
      this.#settings = readConfigFile(this.#settingsPath, settingsSchema)
      this.#sendNewSettings()
    }
    catch (error) {
      const initError = getInitError({
        message: (error as Error).message,
      })
      this.errors.push(initError)
      this.emit('error', initError)
    }
  }

  write(payload: ChangeSettingsPayload) {
    try {
      this.#settings = settingsSchema.parse(objectPath.set(this.#settings, payload.path, payload.value))
      saveConfigFile(this.#settingsPath, settingsSchema, this.#settings)
      this.errors = []
      this.#sendNewSettings()
    }
    catch (error) {
      const initError: InitError = {
        type: 'initSettingsError',
        message: (error as Error).message,
      }
      this.emit('error', initError)
    }
  }
}
