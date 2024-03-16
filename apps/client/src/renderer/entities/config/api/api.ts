import type { InitError } from '@root/config/errors'
import type { ChangeSettingsPayload } from '@root/settings/types'
import type { ExtensionSchema, SettingsSchema, ThemeSchema } from '@treeride/schemas/schemas'

export const getSettings = async (): Promise<SettingsSchema> => {
  const result = await window.api.invoke.getSettings()
  return result
}

export const getExtensions = async (): Promise<ExtensionSchema[]> => {
  const result = await window.api.invoke.getExtensions()
  return result
}

export const getThemes = async (): Promise<ThemeSchema[]> => {
  const result = await window.api.invoke.getThemes()
  return result
}

export const getInitErrors = async (): Promise<InitError[]> => {
  const result = await window.api.invoke.getInitErrors()
  return result
}

export const getIsFirstRun = async (): Promise<boolean> => {
  const result = await window.api.invoke.getIsFirstRun()
  return result
}

export const changeSettings = async (payload: ChangeSettingsPayload) => {
  const result = await window.api.invoke.changeSettings(payload)
  return result
}

export const reloadConfig = async () => {
  await window.api.invoke.reloadConfig()
}
