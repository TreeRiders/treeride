import type { ChangeSettingsPayload } from '@root/config/types'

export const getConfig = async () => {
  const response = await window.api.doInvoke('get-config')
  return response
}

export const reloadConfig = async () => {
  const response = await window.api.doInvoke('reload-config')
  return response
}

export const changeSettings = async (payload: ChangeSettingsPayload) => {
  const response = await window.api.doInvoke('change-settings', payload)
  return response
}
