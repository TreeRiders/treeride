import type { InputProps } from '@treeride/ui'
import { Input } from '@treeride/ui'
import { type FC, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type HeaderSearchProps = Pick<InputProps, 'placeholder' | 'value' | 'onChange'>

const HeaderSearch: FC<HeaderSearchProps> = (props) => {
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  return createPortal(
    (
      <Input
        className="flex-1"
        ref={searchRef}
        variant="search"
        {...props}
      />
    ),
    document.getElementById('header-search') as HTMLElement,
  )
}

export { HeaderSearch }
