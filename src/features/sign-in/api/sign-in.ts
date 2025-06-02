import { apiClient } from '@/shared'

export async function signIn({ username, password }: SignInParameters) {
  const { error } = await apiClient.POST('/auth', {
    body: { username, password },
  })
  if (error) {
    throw new Error(JSON.stringify(error.detail))
  }
}

interface SignInParameters {
  username: string
  password: string
}
