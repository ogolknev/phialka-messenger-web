import { apiClient, HTTPError } from '@/shared'

interface InviteUserToServerOptions {
  serverId: string
  userId: string
}

export async function inviteUserToServer(options: InviteUserToServerOptions) {
  const { response } = await apiClient.POST('/servers/{server_id}/invite', {
    params: { path: { server_id: options.serverId } },
    body: { user_id: options.userId },
  })
  if (!response.ok) throw new HTTPError(response.statusText, response.status)
}
