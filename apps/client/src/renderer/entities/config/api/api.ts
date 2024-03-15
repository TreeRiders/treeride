import type { GetConfigResult } from '@root/config/types'
import type { ChangeSettingsPayload } from '@root/settings/types'

export const getConfig = async (): Promise<GetConfigResult> => {
  const result = await window.api.invoke.getConfig()
  return result
}

export const changeSettings = async (payload: ChangeSettingsPayload) => {
  const result = await window.api.invoke.changeSettings(payload)
  return result
}

export const reloadConfig = async () => {
  await window.api.invoke.reloadConfig()
}
