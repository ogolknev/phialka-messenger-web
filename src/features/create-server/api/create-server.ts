import { adaptApiServer } from '@/entities'
import { apiClient, HTTPError } from '@/shared'

export async function createServer({ name, description }: CreateServerParameters) {
  const { data, response, error } = await apiClient.POST('/servers', {
    body: { title: name, description },
  })
  if (!response.ok) throw new HTTPError(response.statusText, response.status)
  if (error) throw error
  if (!data) throw new Error('Server not created or not returned')
  return adaptApiServer(data)
}

interface CreateServerParameters {
  name: string
  description: string
}
