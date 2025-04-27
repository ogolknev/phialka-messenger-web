import { adaptApiServer } from '@/entities'
import { apiClient, HTTPError } from '@/shared'

export async function editServer({ serverId, photo, name, description }: EditServerParameters) {
  const server = await editServerWithoutPhoto({ serverId, name, description })
  if (photo) await setServerPhoto({ serverId: server.id, photo })
}

async function editServerWithoutPhoto({
  serverId,
  name,
  description,
}: EditServerWithoutPhotoParameters) {
  const { data, response, error } = await apiClient.PATCH('/servers/{server_id}', {
    body: { title: name, description },
    params: { path: { server_id: serverId } },
  })
  if (!response.ok) throw new HTTPError(response.statusText, response.status)
  if (error) throw error
  if (!data) throw new Error('Server not created or not returned')
  return adaptApiServer(data)
}

async function setServerPhoto({ serverId, photo }: ServerPhotoParameters) {
  const formData = new FormData()
  formData.append('logo', photo)
  const response = await fetch(`/api/servers/${serverId}/logo`, { method: 'PUT', body: formData })
  if (!response.ok) throw new HTTPError(response.statusText, response.status)
}

interface EditServerParameters {
  serverId: string
  photo?: Blob | null
  name: string
  description: string
}

interface EditServerWithoutPhotoParameters {
  serverId: string
  name: string
  description: string
}

interface ServerPhotoParameters {
  serverId: string
  photo: Blob
}
