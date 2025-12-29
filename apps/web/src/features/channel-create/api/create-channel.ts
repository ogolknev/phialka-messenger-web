import { adaptApiChannel } from "@/entities"
import { apiClient, HTTPError } from "@/shared"

export async function createChannel({
  photo,
  serverId,
  name,
  description,
}: CreateChannelParameters) {
  const channel = await createChannelWithoutPhoto({
    serverId,
    name,
    description,
  })
  if (photo) await setChannelPhoto({ channelId: channel.id, photo })
}

async function createChannelWithoutPhoto({
  serverId,
  name,
  description,
}: CreateChannelWithoutPhotoParameters) {
  const { data, response, error } = await apiClient.POST("/channels", {
    body: { server_id: serverId, title: name, description },
  })
  if (!response.ok) throw new HTTPError(response)
  if (error) throw error
  if (!data) throw new Error("Channel not created or not returned")
  return adaptApiChannel(data)
}

async function setChannelPhoto({ channelId, photo }: SetChannelPhotoParameters) {
  const formData = new FormData()
  formData.append("logo", photo)
  const response = await fetch(`/api/channels/${channelId}/logo`, {
    method: "PUT",
    body: formData,
  })
  if (!response.ok) throw new HTTPError(response)
}

interface CreateChannelParameters {
  photo?: Blob | null
  serverId: string
  name: string
  description: string
}

interface CreateChannelWithoutPhotoParameters {
  serverId: string
  name: string
  description: string
}

interface SetChannelPhotoParameters {
  channelId: string
  photo: Blob
}
