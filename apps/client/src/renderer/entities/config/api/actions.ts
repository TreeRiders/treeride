export const getConfig = async () => {
  const response = await window.api.doInvoke('get-config')
  return response
}

export const reloadConfig = async () => {
  const response = await window.api.doInvoke('reload-config')
  return response
}
