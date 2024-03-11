import type { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

type FooterLeftActionsProps = PropsWithChildren

export const FooterLeftActions: FC<FooterLeftActionsProps> = ({ children }) => {
  return createPortal(children, document.getElementById('footer-left-actions')!)
}
