import { fetchAPI } from './fetch'

export default {
  async getProfile() {
    const response = await fetchAPI<API.Profile>('/profile', {
      method: 'get',
    })
    return response
  },
  async editProfile(form: API.ProfileEdit) {
    await fetchAPI('/profile', {
      method: 'patch',
      body: form,
    })
  },
  async setProfilePhoto(formData: FormData) {
    await fetchAPI('/profile/photo', {
      method: 'put',
      body: formData,
    })
  },
}
