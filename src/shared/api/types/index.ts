import type { components } from './api'

export type ApiFile = components['schemas']['File']
export type ApiProfile = components['schemas']['User']
export type ApiServer = components['schemas']['Server']
export type ApiChannel = components['schemas']['Channel']

export { HTTPError } from './http-error'
