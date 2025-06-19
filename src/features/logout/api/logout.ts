import { apiClient, HTTPError } from "@/shared"

export async function logout() {
  const { response } = await apiClient.POST("/auth/logout")

  if (!response.ok) throw new HTTPError(response)
}
