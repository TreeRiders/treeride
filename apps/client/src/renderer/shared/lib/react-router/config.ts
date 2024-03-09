const pathKeys = {
  root: '/',
  main: () => pathKeys.root.concat('main/'),
  init: () => pathKeys.root.concat('init/'),
  hello: () => pathKeys.root.concat('hello/'),
  settings: () => pathKeys.root.concat('settings/'),
  appearanceSettings: () => pathKeys.settings().concat('appearance/'),
  systemSettings: () => pathKeys.settings().concat('system/'),
  extensionsSettings: () => pathKeys.settings().concat('extensions/'),
} as const

export { pathKeys }
