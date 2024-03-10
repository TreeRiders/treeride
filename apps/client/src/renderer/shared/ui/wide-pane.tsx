import type { FC, PropsWithChildren } from 'react'
import { useLayoutEffect } from 'react'

type WidePaneProps = PropsWithChildren

const WidePane: FC<WidePaneProps> = ({ children }) => {
  useLayoutEffect(() => {
    window.api.doInvoke('change-window-size', 'wide')

    return () => {
      window.api.doInvoke('change-window-size', 'default')
    }
  }, [])

  return children
}

export { WidePane }
