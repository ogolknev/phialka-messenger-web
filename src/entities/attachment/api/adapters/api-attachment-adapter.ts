import type { ApiAttachment } from "@/shared"
import type { Attachment } from "../../model"
import { adaptApiFile } from "@/entities"

export function adaptApiAttachment(apiAttachment: ApiAttachment): Attachment {
  return {
    messageId: apiAttachment.message_id,
    type: apiAttachment.attach_type,
    file: adaptApiFile(apiAttachment.file),
  }
}
