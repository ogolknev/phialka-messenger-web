import type { ApiProfile } from "@/shared"
import type { Profile } from "../../model"
import { adaptApiFile } from "@/entities/uploaded-files"

export function adaptApiProfile(apiProfile: ApiProfile): Profile {
  return {
    id: apiProfile.user_id,
    name: apiProfile.name,
    tag: apiProfile.tag,
    description: apiProfile.description ?? "",
    birthdate: apiProfile.birthdate ? new Date(apiProfile.birthdate) : null,
    photo: apiProfile.photo ? adaptApiFile(apiProfile.photo) : null,
  }
}
