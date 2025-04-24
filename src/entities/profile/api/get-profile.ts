import { apiClient } from '@/shared'
import type { Profile } from '../model'
import { adaptApiProfile } from './adapters'

export async function getProfile(): Promise<Profile> {
  const { data, error } = await apiClient.GET('/profile')
  if (error) throw new Error(JSON.stringify(error))
  return adaptApiProfile(data)
}
