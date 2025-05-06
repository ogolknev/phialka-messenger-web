import { apiClient, dateToString } from '@/shared'

export async function signUp({
  name,
  tag,
  description,
  birthdate,
  username,
  password,
}: SignUpParameters): Promise<void> {
  const birthdateString = birthdate ? dateToString(birthdate, 'yyyy-MM-dd') : undefined
  const { error } = await apiClient.POST('/profile', {
    body: { name, tag, description, birthdate: birthdateString, username, password },
  })
  if (error) {
    throw new Error(JSON.stringify(error.detail))
  }
}

interface SignUpParameters {
  name: string
  tag?: string
  description?: string
  birthdate?: Date
  username: string
  password: string
}
