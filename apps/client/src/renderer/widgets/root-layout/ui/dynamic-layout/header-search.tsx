import type { InputProps } from '@treeride/ui'
import { CommandInput } from '@treeride/ui'
import type { FC } from 'react'
import { createPortal } from 'react-dom'

type HeaderSearchProps = Pick<InputProps, 'placeholder'>

const HeaderSearch: FC<HeaderSearchProps> = (props) => {
  return createPortal(
    (
      <CommandInput
        className="flex-1"
        {...props}
      />
    ),
    document.getElementById('header-search') as HTMLElement,
  )
}

export { HeaderSearch }
