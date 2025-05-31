import { adaptApiUser } from '@/entities'
import { apiClient, HTTPError } from '@/shared'

interface Params {
  count?: number
  offset?: number
  signal?: AbortSignal
}

export async function searchUsers(prompt: string, params?: Params) {
  const { data, response } = await apiClient.GET('/users/search', {
    params: { query: { prompt, ...params } },
    signal: params?.signal,
  })

  if (!response.ok) {
    throw new HTTPError(response.statusText, response.status)
  }

  if (data === undefined) {
    throw new Error(`Failed receive users for prompt "${prompt}"`)
  }

  return (data ?? []).map(adaptApiUser)
}
