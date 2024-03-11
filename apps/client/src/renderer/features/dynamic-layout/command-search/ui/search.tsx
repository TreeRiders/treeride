import { CommandInput } from '@treeride/ui'
import { useEffect, useRef } from 'react'
import type { ElementRef, FC } from 'react'

export const Search: FC = () => {
  const inputRef = useRef<ElementRef<'input'>>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleBlur = () => {
    inputRef.current?.focus()
  }

  return (
    <CommandInput
      placeholder="Search for commands and settings"
      ref={inputRef}
      onBlur={handleBlur}
    />
  )
}
