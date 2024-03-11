import type { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

type HeaderActionsProps = PropsWithChildren

export const HeaderActions: FC<HeaderActionsProps> = ({ children }) => {
  return createPortal(children, document.getElementById('header-left-actions')!)
}
