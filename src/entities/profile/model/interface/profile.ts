import type { UploadedFile } from '@/entities/uploaded-file'

export interface Profile {
  name: string
  tag: string
  description: string
  birthdate: Date | null
  photo: UploadedFile | null
}
