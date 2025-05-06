import { apiClient, HTTPError } from '@/shared'

export async function deleteServer(serverId: string) {
  const { response } = await apiClient.DELETE('/servers/{server_id}', {
    params: { path: { server_id: serverId } },
  })
  if (!response.ok) throw new HTTPError(response.statusText, response.status)
}
