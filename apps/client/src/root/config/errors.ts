interface InitSettingsError {
  type: 'initSettingsError'
  message: string
}

interface InitExtensionError {
  type: 'initExtensionError'
  extension: string
  message: string
}

interface InitExtensionPartError {
  type: 'initExtensionPartError'
  extension: string
  part: string
  message: string
}

interface CreateInitErrorPayload {
  extension?: string
  part?: string
  message: string
}

type InitError = InitSettingsError | InitExtensionError | InitExtensionPartError

const getInitError = (payload: CreateInitErrorPayload): InitError => {
  const { message, extension, part } = payload

  if (!extension) {
    return {
      message,
      type: 'initSettingsError',
    } as InitSettingsError
  }

  if (!part) {
    return {
      extension,
      message,
      type: 'initExtensionError',
    } as InitExtensionError
  }

  return {
    extension,
    message,
    part,
    type: 'initExtensionPartError',
  } as InitExtensionPartError
}

export { getInitError, type InitError }
