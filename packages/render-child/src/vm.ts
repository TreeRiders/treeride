const space = globalThis as unknown as {
  React: typeof import('react')
  ReactDOM: typeof import('react-dom/server')
  component: React.ReactNode
  log: (message: string) => void
}

space.log(`DOM Tree: ${space.ReactDOM.renderToString(space.component)}`)
