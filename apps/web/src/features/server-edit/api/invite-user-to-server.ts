import { apiClient } from "@/shared"

export async function inviteUserToServer({ serverId, userId }: InviteUserToServerParameters) {
  const { response, error } = await apiClient.POST('/servers/{server_id}/invite', {
    params: { path: { server_id: serverId } },
    body: { user_id: userId },
  })
  if (!response.ok) throw new Error("Failed to invite user to server")
  if (error) throw error
}

interface InviteUserToServerParameters {
  serverId: string
  userId: string
}
