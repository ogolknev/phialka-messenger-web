import type { ApiServer } from '@/shared'
import { adaptApiFile } from '@/entities/uploaded-files/@x/server'
import { Server } from '../../model/server'

export function adaptApiServer(apiServer: ApiServer): Server {
  return new Server({
    id: apiServer.server_id,
    ownerId: apiServer.owner_id,
    name: apiServer.title,
    photo: apiServer.logo ? adaptApiFile(apiServer.logo) : null,
    description: apiServer.description ?? '',
    createdAt: new Date(apiServer.created_at),
  })
}
