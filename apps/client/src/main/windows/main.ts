import { join } from 'node:path'
import process from 'node:process'
import { BrowserWindow, shell } from 'electron'
import icon from '@resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import { windowSizes } from '@root/window'

const createWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    title: 'TreeRide',
    frame: false,
    width: windowSizes.default.width,
    height: windowSizes.default.height,
    skipTaskbar: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    closable: false,
    roundedCorners: true,
    backgroundMaterial: 'acrylic',
    vibrancy: 'fullscreen-ui',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('blur', () => {})

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  }
  else {
    mainWindow.loadFile(join(__dirname, '../../renderer/index.html'))
  }

  return mainWindow
}

export { createWindow }
