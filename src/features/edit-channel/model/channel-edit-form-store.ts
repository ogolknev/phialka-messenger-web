import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { editChannel } from '../api'

export const useChannelEditFormStore = defineStore('channel-edit-form', () => {
  const loading = ref(false)

  const form = reactive<ChannelEditForm>({
    channelId: '',
    photo: null,
    name: '',
    description: '',
  })

  function resetForm() {
    form.channelId = ''
    form.photo = null
    form.name = ''
    form.description = ''
  }

  function validateForm() {
    if (!form.channelId) return 'Channel id is required'
    if (!form.name) return 'Channel name is required'
  }

  async function submitForm() {
    const error = validateForm()
    if (error) return error

    try {
      loading.value = true

      await editChannel(form)
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

interface ChannelEditForm {
  channelId: string
  photo: Blob | null
  name: string
  description: string
}
