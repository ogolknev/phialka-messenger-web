import type { ApiUser } from "@/shared"
import type { User } from "../../model"
import { adaptApiFile } from "@/entities/uploaded-files/@x/user"

export function adaptApiUser(apiUser: ApiUser): User {
  return {
    id: apiUser.user_id,
    name: apiUser.name,
    description: apiUser.description ?? "",
    tag: apiUser.tag,
    photo: apiUser.photo ? adaptApiFile(apiUser.photo) : null,
  }
}
