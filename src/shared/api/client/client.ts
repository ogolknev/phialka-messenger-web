import createClient from 'openapi-fetch'
import type { paths } from '../types/api'

export const apiClient = createClient<paths>({
  baseUrl: '/api',
  credentials: 'include',
})
