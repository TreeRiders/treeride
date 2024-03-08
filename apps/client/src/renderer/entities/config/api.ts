const getConfig = async () => {
  const response = await window.api.doInvoke('get-config')
  return response
}

export { getConfig }
