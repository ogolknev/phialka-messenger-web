import { apiClient, HTTPError } from '@/shared'
import { adaptApiServer } from './adapters'

export async function getServers(options?: { signal?: AbortSignal }) {
  const { data, response } = await apiClient.GET('/servers', {
    signal: options?.signal,
  })
  if (!response.ok) throw new HTTPError(response.statusText, response.status)
  if (!data) throw new Error("Can't fetch servers")
  return data.map(adaptApiServer)
}
