import type { InputProps } from '@treeride/ui'
import { CommandInput } from '@treeride/ui'
import { useLayoutEffect, useRef } from 'react'
import type { FC, FocusEventHandler } from 'react'
import { createPortal } from 'react-dom'

type HeaderSearchProps = Pick<InputProps, 'placeholder'>

const HeaderSearch: FC<HeaderSearchProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
    inputRef.current?.focus()
  }

  useLayoutEffect(() => {
    inputRef.current?.focus()
  }, [])

  return createPortal(
    (
      <CommandInput
        className="flex-1"
        ref={inputRef}
        onBlur={handleBlur}
        {...props}
      />
    ),
    document.getElementById('header-search') as HTMLElement,
  )
}

export { HeaderSearch }
