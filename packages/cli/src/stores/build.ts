import type { ExtensionSchema } from '@treeride/schemas'
import { create } from 'zustand'

interface BuildStore {
  steps: string[]
  extension: ExtensionSchema | null
  isBuildSuccess: boolean | null
  buildError: string | null
  setExtension: (extension: ExtensionSchema) => void
  setBuildSuccess: (isSuccess: boolean) => void
  setBuildError: (error: string) => void
  addStep: (step: string) => void
}

export const useBuildStore = create<BuildStore>(set => ({
  extension: null,
  isBuildSuccess: null,
  buildError: null,
  steps: [],
  setExtension: extension => set({ extension }),
  setBuildSuccess: isSuccess => set({ isBuildSuccess: isSuccess }),
  setBuildError: error => set({ buildError: error }),
  addStep: step => set(state => ({ steps: [...state.steps, step] })),
}))
