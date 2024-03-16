interface BaseInitError {
  message: string
}

export interface ExtensionInitError extends BaseInitError {
  type: 'extension'
  extension: string
}

export interface ThemeInitError extends BaseInitError {
  type: 'theme'
  theme: string
}

export interface SettingsInitError extends BaseInitError {
  type: 'settings'
}

export type InitError = ExtensionInitError | ThemeInitError | SettingsInitError
