import { adaptApiMessage } from "@/entities/message/@x/channel"
import { apiClient, HTTPError } from "@/shared"

export async function getChannelMessages(
  { channelId, pagination }: GetChannelMessagesParameters,
  options?: { signal?: AbortSignal },
) {
  const { data, response } = await apiClient.GET("/channels/{channel_id}/messages", {
    params: { path: { channel_id: channelId }, query: pagination },
    signal: options?.signal,
  })
  if (!response.ok) throw new HTTPError(response)
  return (
    data?.map((apiMessage) =>
      adaptApiMessage({
        apiMessage: apiMessage.message,
        channelId: apiMessage.channel_id,
        sequence: apiMessage.sequence,
      }),
    ) ?? []
  )
}

type GetChannelMessagesParameters = {
  channelId: string
  pagination: { sequence?: number; count: number }
}
