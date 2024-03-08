import { BrowserWindow, Menu, Tray, app } from 'electron'
import icon from '@resources/tray-icon.png?asset'

const createTray = (): Tray => {
  const tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', type: 'normal', click: () => {
      const window = BrowserWindow.getAllWindows()[0]
      window?.show()
    } },
    { label: 'Exit', type: 'normal', click: () => {
      app.exit()
    } },
  ])
  tray.setToolTip('TreeRide')
  tray.setContextMenu(contextMenu)

  return tray
}

export { createTray }
