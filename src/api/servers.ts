import { fetchAPI } from './fetch'

export default {
  async getServers() {
    return await fetchAPI<API.Server[]>('/servers', {
      method: 'get',
    })
  },
  async createServer(form: API.ServerCreate) {
    await fetchAPI('/servers', {
      method: 'post',
      body: form,
    })
  },
  async editServer(serverID: string, form: API.ServerEdit) {
    await fetchAPI(`/servers/${serverID}`, {
      method: 'patch',
      body: form,
    })
  },
  async removeServer(serverID: string) {
    await fetchAPI(`/servers/${serverID}`, {
      method: 'delete',
    })
  },
  async setServerIcon(serverID: string, formData: FormData) {
    await fetchAPI(`/servers/${serverID}/logo`, {
      method: 'put',
      body: formData,
    })
  },
}
