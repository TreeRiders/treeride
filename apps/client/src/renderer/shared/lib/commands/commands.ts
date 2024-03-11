export const exitApp = () => window.electron.ipcRenderer.send('exit-app')
