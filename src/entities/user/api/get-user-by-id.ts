import { apiClient, HTTPError } from '@/shared'
import { adaptApiUser } from './adapters'

export async function getUserById(userId: string, options?: { signal?: AbortSignal }) {
  const { response, data } = await apiClient.GET('/users/{user_id}', {
    params: { path: { user_id: userId } },
    signal: options?.signal,
  })
  if (!response.ok) throw new HTTPError(response.statusText, response.status)
  if (!data) throw new Error(`Can't receive user data (userId: ${userId})`)
  return adaptApiUser(data)
}
