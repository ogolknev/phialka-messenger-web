import { fetchAPI } from './fetch'

export default {
  async signIn(form: { username: string; password: string }) {
    const response = await fetchAPI<{ access: string; refresh: string }>('/auth', {
      method: 'post',
      body: form,
    })
    return response
  },
  async signOut() {
    await fetchAPI('/auth', {
      method: 'delete',
    })
  },
  async signUp(form: { name: string; username: string; password: string }) {
    await fetchAPI('/profile', {
      method: 'post',
      body: form,
    })
  },
}
