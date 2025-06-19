import { apiClient, HTTPError } from "@/shared"

export async function login(credentials: { username: string; password: string }) {
  const { response } = await apiClient.POST("/auth", { body: credentials })

  if (!response.ok) throw new HTTPError(response)
}
