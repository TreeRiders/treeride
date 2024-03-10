import { useCallback, useEffect } from 'react'

interface Shortcut {
  key: string
  ctrlModifier: boolean
  shiftModifier: boolean
  altModifier: boolean
  action: () => void
}

const useShortcuts = (shortcuts: Shortcut[]) => {
  const handleKeyPress = useCallback((event) => {
    shortcuts.forEach((shortcut) => {
      if (shortcut.ctrlModifier && !event.ctrlKey) {
        return
      }

      if (shortcut.shiftModifier && !event.shiftKey) {
        return
      }

      if (shortcut.altModifier && !event.altKey) {
        return
      }

      if (event.key === shortcut.key) {
        shortcut.action()
      }
    })
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])
}

export { useShortcuts }
