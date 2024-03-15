import type { FC, PropsWithChildren } from 'react'
import { useLayoutEffect } from 'react'

type WidePaneProps = PropsWithChildren

export const WidePane: FC<WidePaneProps> = ({ children }) => {
  useLayoutEffect(() => {
    window.api.invoke.changeWindowSize('wide')

    return () => {
      window.api.invoke.changeWindowSize('default')
    }
  }, [])

  return children
}
