import type { FC, PropsWithChildren } from 'react'
import { useLayoutEffect } from 'react'

type WidePaneProps = PropsWithChildren

export const WidePane: FC<WidePaneProps> = ({ children }) => {
  useLayoutEffect(() => {
    window.api.send('change-window-size', 'wide')

    return () => {
      window.api.send('change-window-size', 'default')
    }
  }, [])

  return children
}
