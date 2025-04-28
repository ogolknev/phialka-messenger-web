import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { createChannel } from '../api'

export const useChannelCreateFormStore = defineStore('channel-create-form', () => {
  const loading = ref(false)

  const form = reactive<ChannelCreateForm>({
    serverId: '',
    photo: null,
    name: '',
    description: '',
  })

  function resetForm() {
    form.serverId = ''
    form.photo = null
    form.name = ''
    form.description = ''
  }

  function validateForm() {
    if (!form.serverId) return 'Server id is required'
    if (!form.name) return 'Channel name is required'
  }

  async function submitForm() {
    const error = validateForm()
    if (error) return error

    try {
      loading.value = true

      await createChannel(form)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    form,
    resetForm,
    submitForm,
  }
})

interface ChannelCreateForm {
  serverId: string
  photo: Blob | null
  name: string
  description: string
}
