import { adaptApiServer } from "@/entities"
import { apiClient, HTTPError } from "@/shared"

export async function createServer({ photo, name, description }: CreateServerParameters) {
  const server = await createServerWithoutPhoto({ name, description })
  if (photo) await setServerPhoto({ serverId: server.id, photo })
}

async function createServerWithoutPhoto({ name, description }: CreateServerWithoutPhotoParameters) {
  const { data, response, error } = await apiClient.POST("/servers", {
    body: { title: name, description },
  })
  if (!response.ok) throw new HTTPError(response)
  if (error) throw error
  if (!data) throw new Error("Server not created or not returned")
  return adaptApiServer(data)
}

async function setServerPhoto({ serverId, photo }: ServerPhotoParameters) {
  const formData = new FormData()
  formData.append("logo", photo)
  const response = await fetch(`/api/servers/${serverId}/logo`, {
    method: "PUT",
    body: formData,
  })
  if (!response.ok) throw new HTTPError(response)
}

interface CreateServerParameters {
  photo?: Blob | null
  name: string
  description: string
}

interface CreateServerWithoutPhotoParameters {
  name: string
  description: string
}

interface ServerPhotoParameters {
  serverId: string
  photo: Blob
}
