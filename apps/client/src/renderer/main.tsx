import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@app/app'

import '@treeride/ui/theme'
import './app/styles/globals.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
