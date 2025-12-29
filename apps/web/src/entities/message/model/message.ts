import type { Attachment } from "@/entities/attachment/@x/message"

export interface Message {
  id: string
  sequence: number
  authorId: string
  channelId: string
  content?: string
  attachments: Attachment[]
  replyId?: string
  updatedAt: Date | null
  createdAt: Date | null
}
