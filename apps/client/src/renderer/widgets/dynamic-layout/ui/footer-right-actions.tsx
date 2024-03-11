import type { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

type FooterRightActionsProps = PropsWithChildren

export const FooterRightActions: FC<FooterRightActionsProps> = ({ children }) => {
  return createPortal(children, document.getElementById('footer-right-actions')!)
}
