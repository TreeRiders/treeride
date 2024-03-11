import type { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

type HeaderSearchProps = PropsWithChildren

export const HeaderSearch: FC<HeaderSearchProps> = ({ children }) => {
  return createPortal(children, document.getElementById('header-search')!)
}
