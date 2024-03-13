import type { ChangeSettingsPayload } from '@root/config/types'

export const getSettings = async () => {
  const response = await window.api.send('get-settings', null)
  return response
}

export const reloadSettings = async () => {
  const response = await window.api.send('reload-settings', null)
  return response
}

export const getExtensions = async () => {
  const response = await window.api.send('get-extensions', null)
  return response
}

export const reloadExtensions = async () => {
  const response = await window.api.send('reload-extensions', null)
  return response
}

export const changeSettings = async (payload: ChangeSettingsPayload) => {
  const response = await window.api.send('change-settings', payload)
  return response
}
