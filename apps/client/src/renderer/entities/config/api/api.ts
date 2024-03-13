import { useMutation, useQuery } from '@tanstack/react-query'
import { changeSettings, getExtensions, getSettings, reloadExtensions, reloadSettings } from './actions'

export const useGetSettings = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  })
}

export const useGetExtensions = () => {
  return useQuery({
    queryKey: ['extensions'],
    queryFn: getExtensions,
  })
}

export const useReloadSettings = () => {
  return useMutation({
    mutationKey: ['settings'],
    mutationFn: reloadSettings,
  })
}

export const useReloadExtensions = () => {
  return useMutation({
    mutationKey: ['extensions'],
    mutationFn: reloadExtensions,
  })
}

export const useChangeSettings = () => {
  return useMutation({
    mutationKey: ['settings'],
    mutationFn: changeSettings,
  })
}
