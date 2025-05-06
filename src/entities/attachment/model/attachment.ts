import type { UploadedFile } from '@/entities/uploaded-files/@x/attachment'

export interface Attachment {
  messageId: string
  type: string
  file: UploadedFile
}
