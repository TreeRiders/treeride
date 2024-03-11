import { useMutation, useQuery } from '@tanstack/react-query'
import { getConfig, reloadConfig } from './actions'

export const useGetConfigQuery = () => useQuery({
  queryKey: ['config'],
  queryFn: getConfig,
})

export const useReloadConfigMutation = () => useMutation({
  mutationKey: ['config'],
  mutationFn: reloadConfig,
})
