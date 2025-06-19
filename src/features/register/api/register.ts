import { apiClient, HTTPError } from "@/shared"

interface Payload {
  name: string
  tag?: string
  description?: string
  birthdate?: string
  username: string
  password: string
}

export async function register(payload: Payload) {
  const { response } = await apiClient.POST("/profile", { body: payload })

  if (!response.ok) throw new HTTPError(response)
}
