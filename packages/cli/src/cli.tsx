#!/usr/bin/env node
import { render } from 'ink'
import meow from 'meow'
import { Build, CommandNotFound, Find, Install, Uninstall } from './points'

const cli = meow(
 `
 Usage
   $ cli

 Commands
  find        Find extensions
  install     Install new extension
  build       Build extension
  uninstall   Uninstall extension

 Examples
   $ cli find --query=todo`,

 {
   importMeta: import.meta,
 },
)

const pointsMap = {
  'find': <Find />,
  'install': <Install />,
  'build': <Build />,
  'uninstall': <Uninstall />,
  'command-not-found': <CommandNotFound />,
}

const command = cli.input?.[0] as keyof typeof pointsMap ?? 'command-not-found'

const Component = pointsMap[command]

render(
  Component,
)
