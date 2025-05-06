import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { editServer } from '../api'

export const useServerEditFormStore = defineStore('server-edit-form', () => {
  const loading = ref(false)

  const form = reactive<ServerEditForm>({
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
    if (!form.serverId) return 'First choose a server'
    if (!form.name) return 'Server name required'
  }

  async function submitForm() {
    const error = validateForm()
    if (error) return error

    try {
      loading.value = true

      await editServer(form)
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

interface ServerEditForm {
  serverId: string
  photo: Blob | null
  name: string
  description: string
}
