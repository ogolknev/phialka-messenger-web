import { apiClient, HTTPError } from "@/shared"
import type { Profile } from "../model"
import { adaptApiProfile } from "./adapters"

export async function getProfile(options?: { signal?: AbortSignal }): Promise<Profile> {
  const { data, response } = await apiClient.GET("/profile", {
    signal: options?.signal,
  })
  if (!response.ok) throw new HTTPError(response)
  if (!data) throw new Error("Can't fetch profile")
  return adaptApiProfile(data)
}
