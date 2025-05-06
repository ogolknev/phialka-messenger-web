import type { UploadedFile } from '@/entities/uploaded-files/@x/user'

export interface User {
  id: string
  name: string
  description: string
  tag: string
  birthdate?: Date | null
  photo: UploadedFile | null
}
