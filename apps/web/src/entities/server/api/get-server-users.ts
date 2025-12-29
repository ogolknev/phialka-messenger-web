import { adaptApiUser } from "@/entities/user"
import { apiClient, HTTPError } from "@/shared"

interface GetServerUsersOptions {
  signal?: AbortSignal
}

export async function getServerUsers(serverId: string, options?: GetServerUsersOptions) {
  const { data, response } = await apiClient.GET("/servers/{server_id}/getMembers", {
    params: { path: { server_id: serverId } },
    signal: options?.signal,
  })
  if (!response.ok) throw new HTTPError(response)
  if (data === undefined) throw new Error("Failed receive server users")

  return (data ?? []).map(adaptApiUser)
}
