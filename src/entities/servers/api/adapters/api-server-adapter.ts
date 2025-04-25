import type { ApiServer } from '@/shared/api/types'
import { Server } from '../../model/server'
import { adaptApiFile } from '@/entities/uploaded-files'

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
