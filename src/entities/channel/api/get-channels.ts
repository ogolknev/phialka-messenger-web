import { apiClient, HTTPError } from '@/shared'
import { adaptApiChannel } from './adapters'

export async function getChannels({ serverId }: GetChannelsParams) {
  const { data, response } = await apiClient.GET('/servers/{server_id}/getChannels', {
    params: { path: { server_id: serverId } },
  })
  if (!response.ok) throw new HTTPError(response.statusText, response.status)
  if (!data) throw new Error("Can't fetch servers")
  return data.map(adaptApiChannel)
}

interface GetChannelsParams {
  serverId: string
}
