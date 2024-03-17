import type { RunExtensionPayload } from '@root/extensions'

export const runExtension = async (payload: RunExtensionPayload) => {
  window.api.invoke.runExtension(payload)
}
