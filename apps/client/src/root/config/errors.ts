class SettingsError extends Error {
  code = 'SETTINGS_ERROR'

  constructor(message: string) {
    super(message)
    this.name = 'SettingsError'
  }
}

class ExtensionError extends Error {
  code = 'EXTENSION_ERROR'
  extension: string

  constructor(extension: string, message: string) {
    super(message)
    this.extension = extension
    this.name = 'ExtensionError'
  }
}

class ExtensionThemeError extends Error {
  code = 'EXTENSION_THEME_ERROR'
  extension: string
  theme: string

  constructor(extension: string, theme: string, message: string) {
    super(message)
    this.extension = extension
    this.theme = theme
    this.name = 'ExtensionThemeError'
  }
}

class ExtensionCommandError extends Error {
  code = 'EXTENSION_COMMAND_ERROR'
  extension: string
  command: string

  constructor(extension: string, command: string, message: string) {
    super(message)
    this.extension = extension
    this.command = command
    this.name = 'ExtensionCommandError'
  }
}

type InitError = SettingsError | ExtensionError | ExtensionThemeError | ExtensionCommandError

type InitErrorCode = InitError['code']

export {
  SettingsError,
  ExtensionError,
  ExtensionThemeError,
  ExtensionCommandError,
  type InitError,
  type InitErrorCode,
}
