import type { InputProps } from '@treeride/ui'
import { Input } from '@treeride/ui'
import type { FC } from 'react'
import { createPortal } from 'react-dom'

type HeaderSearchProps = Pick<InputProps, 'placeholder' | 'value' | 'onChange'>

const HeaderSearch: FC<HeaderSearchProps> = (props) => {
  return createPortal(
    (
      <Input
        className="flex-1"
        variant="search"
        {...props}
      />
    ),
    document.getElementById('header-search') as HTMLElement,
  )
}

export { HeaderSearch }
