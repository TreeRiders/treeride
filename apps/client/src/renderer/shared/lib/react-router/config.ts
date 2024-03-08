const pathKeys = {
  root: '/',
  main: () => pathKeys.root.concat('main/'),
  hello: () => pathKeys.root.concat('hello/'),
  settings: () => pathKeys.root.concat('settings/'),
  themeSettings: () => pathKeys.settings().concat('theme/'),
} as const

export { pathKeys }
