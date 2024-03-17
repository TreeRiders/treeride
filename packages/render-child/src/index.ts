import process from 'node:process'
import vm from 'node:vm'
import { readFileSync } from 'node:fs'
import ReactDOM from 'react-dom/server'
import { resolveCommand, resolveRenderChildVM } from '@treeride/resolver'

const log = (message: string) => {
  process.send?.({
    type: 'log',
    payload: {
      message,
    },
  })
}

const logFromVM = (message: string) => {
  log(`[From VM]: ${message}`)
}

log('Render child started')

const runCode = async (payload: any) => {
  const { default: mod } = await import(`file://${resolveCommand(payload.extension.name, payload.command.name)}`)
  const vmCode = readFileSync(resolveRenderChildVM(), 'utf-8')
  const component = mod.default()
  vm.runInContext(vmCode, vm.createContext({ process, module, component, ReactDOM, log: logFromVM }))
  log('Command run complete')
}

process.on('message', (message: any) => {
  if (message.type === 'run') {
    runCode(message.payload)
  }
})
