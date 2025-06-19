import { adaptApiChannel } from "@/entities"
import { apiClient, HTTPError } from "@/shared"

export async function editChannel({ photo, channelId, name, description }: EditChannelParameters) {
  const channel = await editChannelWithoutPhoto({
    channelId,
    name,
    description,
  })
  if (photo) await setChannelPhoto({ channelId: channel.id, photo })
}

async function editChannelWithoutPhoto({
  channelId,
  name,
  description,
}: EditChannelWithoutPhotoParameters) {
  const { data, response, error } = await apiClient.PATCH("/channels/{channel_id}", {
    body: { title: name, description },
    params: { path: { channel_id: channelId } },
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

interface EditChannelParameters {
  photo?: Blob | null
  channelId: string
  name: string
  description: string
}

interface EditChannelWithoutPhotoParameters {
  channelId: string
  name: string
  description: string
}

interface SetChannelPhotoParameters {
  channelId: string
  photo: Blob
}
