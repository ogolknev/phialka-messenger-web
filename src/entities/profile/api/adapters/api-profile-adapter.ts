import type { ApiProfile } from '@/shared'
import type { Profile } from '../../model'
import { adaptApiFile } from '@/entities/uploaded-file'

export function adaptApiProfile(apiProfile: ApiProfile): Profile {
  return {
    name: apiProfile.name,
    tag: apiProfile.tag,
    description: apiProfile.description ?? '',
    birthdate: apiProfile.birthdate ? new Date(apiProfile.birthdate) : null,
    photo: apiProfile.photo ? adaptApiFile(apiProfile.photo) : null,
  }
}
