import { apiClient, HTTPError } from "@/shared"
import { adaptApiUser } from "./adapters"

export async function searchUsers(query: string) {
  const { response, data } = await apiClient.GET("/users/search", {
    params: { query: { prompt: query } },
  })
  if (!response.ok) throw new HTTPError(response)
  if (!data) throw new Error("Can't receive users data")
  return data.map(adaptApiUser)
}
