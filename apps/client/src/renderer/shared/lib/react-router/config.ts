const pathKeys = {
  root: '/',
  main: () => pathKeys.root.concat('main/'),
  hello: () => pathKeys.root.concat('hello/'),
} as const

export { pathKeys }
