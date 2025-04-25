import type { components } from './api'

export type ApiFile = components['schemas']['File']
export type ApiProfile = components['schemas']['User']
export type ApiServer = components['schemas']['Server']

export { HTTPError } from './http-error'
