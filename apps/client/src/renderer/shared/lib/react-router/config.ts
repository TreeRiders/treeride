const pathKeys = {
  root: '/',
  main: () => pathKeys.root.concat('main/'),
  hello: () => pathKeys.root.concat('hello/'),
  settings: () => pathKeys.root.concat('settings/'),
  themeSettings: () => pathKeys.settings().concat('theme/'),
  extensionsSettings: () => pathKeys.settings().concat('extensions/'),
} as const

export { pathKeys }
