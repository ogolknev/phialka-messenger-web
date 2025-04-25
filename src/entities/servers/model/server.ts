import type { UploadedFile } from '@/entities/uploaded-files/@x/servers'

export class Server {
  readonly id: string
  readonly ownerId: string
  readonly name: string
  readonly description: string
  readonly photo: UploadedFile | null
  readonly createdAt: Date | null

  constructor(parameters: Server) {
    this.id = parameters.id
    this.ownerId = parameters.ownerId
    this.name = parameters.name
    this.description = parameters.description
    this.photo = parameters.photo
    this.createdAt = parameters.createdAt
  }
}
