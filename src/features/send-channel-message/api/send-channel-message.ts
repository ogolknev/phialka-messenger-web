import type { Attachment } from '@/entities/attachment'
import { apiClient, HTTPError } from '@/shared'

export async function sendChannelMessage({ channelId, body }: SendChannelMessageParameters) {
  if (!body.content && !body.attachments) throw new Error('Text or attachments required')
  const { response } = await apiClient.POST('/channels/{channel_id}/sendMessage', {
    body: {
      content: body.content,
      reply_message_id: body.replyId,
      attachments: body.attachments?.map((attachment) => {
        return {
          attach_type: attachment.type,
          file_id: attachment.file.id,
        }
      }),
    },
    params: { path: { channel_id: channelId } },
  })
  if (!response.ok) throw new HTTPError(response.statusText, response.status)
}

type SendChannelMessageParameters = {
  channelId: string
  body: {
    content?: string
    replyId?: string
    attachments?: Omit<Attachment, 'messageId'>[]
  }
}
