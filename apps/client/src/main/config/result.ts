import type { GetConfigResult } from '@root/config/types'
import type { Settings } from './settings'
import type { Extensions } from './extensions'

export const getConfigResult = (settings: Settings, extensions: Extensions): GetConfigResult => {
  return {
    settings: settings.settings,
    extensions: extensions.extensions,
    errors: [...settings.errors, ...extensions.errors],
  }
}
