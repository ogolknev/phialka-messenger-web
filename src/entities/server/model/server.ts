import type { UploadedFile } from '@/entities/uploaded-files/@x/server'

export class Server {
  id: string
  ownerId: string
  name: string
  description: string
  photo: UploadedFile | null
  createdAt: Date | null

  constructor(parameters: Server) {
    this.id = parameters.id
    this.ownerId = parameters.ownerId
    this.name = parameters.name
    this.description = parameters.description
    this.photo = parameters.photo
    this.createdAt = parameters.createdAt
  }
}
