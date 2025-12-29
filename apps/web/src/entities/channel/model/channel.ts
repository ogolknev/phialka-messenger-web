import type { UploadedFile } from "@/entities/uploaded-files"

export interface Channel {
  id: string
  serverId: string
  name: string
  description: string
  photo: UploadedFile | null
  createdAt: string
}
