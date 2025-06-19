import type { components } from "./types/api"

export type ApiFile = components["schemas"]["File"]
export type ApiProfile = components["schemas"]["User"]
export type ApiServer = components["schemas"]["Server"]
export type ApiChannel = components["schemas"]["Channel"]
export type ApiMessage = components["schemas"]["Message"]
export type ApiAttachment = components["schemas"]["Attachment"]
export type ApiUser = components["schemas"]["User"]

export { default as apiClient } from "./client/client"
