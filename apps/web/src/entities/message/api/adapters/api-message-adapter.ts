import { type ApiMessage } from "@/shared"
import type { Message } from "../../model"
import { adaptApiAttachment } from "@/entities"

export function adaptApiMessage({
  apiMessage,
  channelId,
  sequence,
}: {
  apiMessage: ApiMessage
  channelId: string
  sequence: number
}): Message {
  return {
    id: apiMessage.message_id,
    sequence,
    channelId,
    authorId: apiMessage.author_id,
    content: apiMessage.content ?? undefined,
    attachments: apiMessage.attachments ? apiMessage.attachments.map(adaptApiAttachment) : [],
    replyId: apiMessage.reply_message_id ?? undefined,
    updatedAt: apiMessage.updated_at
      ? new Date(apiMessage.updated_at)
      : new Date(apiMessage.created_at),
    createdAt: new Date(apiMessage.created_at),
  }
}
