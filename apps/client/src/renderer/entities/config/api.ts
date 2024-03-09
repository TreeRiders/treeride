const getConfig = async () => {
  const response = await window.api.doInvoke('get-config')
  return response
}

const reloadConfig = async () => {
  const response = await window.api.doInvoke('reload-config')
  return response
}

export { getConfig, reloadConfig }
