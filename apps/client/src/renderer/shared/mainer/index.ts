const useMainer = () => {
  const exit = () => {
    window.electron.ipcRenderer.send('exit-app')
  }

  return { exit }
}

export { useMainer }
