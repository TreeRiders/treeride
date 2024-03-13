import { useEffect } from 'react'
import Mousetrap from 'mousetrap'

export const useHotkeys = (command: string | string[], callback: () => void) => {
  useEffect(() => {
    if (Array.isArray(command)) {
      command.forEach(cmd => Mousetrap.bind(cmd, callback))
      return () => command.forEach(cmd => Mousetrap.unbind(cmd))
    }
    else {
      Mousetrap.bind(command, callback)
      return () => Mousetrap.unbind(command)
    }
  }, [])
}
