import type { ApiChannel } from '@/shared'
import type { Channel } from '../../model/channel'
import { adaptApiFile } from '@/entities/uploaded-files/@x/channel'

export function adaptApiChannel(apiChannel: ApiChannel): Channel {
  return {
    id: apiChannel.channel_id,
    serverId: apiChannel.server_id,
    name: apiChannel.title,
    description: apiChannel.description ?? '',
    photo: apiChannel.logo ? adaptApiFile(apiChannel.logo) : null,
    createdAt: apiChannel.created_at,
  }
}
