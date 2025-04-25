import { apiClient, HTTPError } from '@/shared'
import type { Profile } from '../model'
import { adaptApiProfile } from './adapters'

export async function getProfile(): Promise<Profile> {
  const { data, response } = await apiClient.GET('/profile')
  if (!response.ok) throw new HTTPError(response.statusText, response.status)
  if (!data) throw new Error("Can't fetch profile")
  return adaptApiProfile(data)
}
