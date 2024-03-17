import { useMutation } from '@tanstack/react-query'
import type { RunExtensionPayload } from '@root/extensions'
import { runExtension } from './actions'

export const useRunExtension = () => {
  const { mutate } = useMutation({
    mutationFn: runExtension,
  })

  const run = (payload: RunExtensionPayload) => {
    mutate(payload)
  }

  return {
    run,
  }
}
