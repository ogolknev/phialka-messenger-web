import type { UploadedFile } from "@/entities/uploaded-files/@x/profile"

export interface Profile {
  id: string
  name: string
  tag: string
  description: string
  birthdate: Date | null
  photo: UploadedFile | null
}
