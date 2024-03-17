const { copyFileSync } = require('node:fs')
const { resolve } = require('node:path')
const { homedir } = require('node:os')

copyFileSync(resolve(__dirname, '..', 'packages', 'render-child', 'dist', 'index.cjs'), resolve(homedir(), '.config', 'treeride', 'render-child', 'render-child.js'))
copyFileSync(resolve(__dirname, '..', 'packages', 'render-child', 'dist', 'vm.cjs'), resolve(homedir(), '.config', 'treeride', 'render-child', 'vm.js'))
