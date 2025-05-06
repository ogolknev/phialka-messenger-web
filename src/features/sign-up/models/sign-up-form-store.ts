import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { signUp } from '../api'

export const useSignUpFormStore = defineStore('sign-up-form', () => {
  const loading = ref(false)

  const form = reactive<SignUpForm>({
    name: '',
    tag: '',
    description: '',
    birthdate: null,
    username: '',
    password: '',
  })

  function resetForm(): void {
    form.name = ''
    form.tag = ''
    form.description = ''
    form.birthdate = null
    form.username = ''
    form.password = ''
  }

  function validateForm(): string | void {
    if (!form.name) return 'Name is required'
    if (!form.username) return 'Username is required'
    if (!form.password) return 'Password is required'
  }

  async function submitForm(): Promise<string | void> {
    const error = validateForm()
    if (error) return error

    try {
      loading.value = true

      await signUp({
        name: form.name,
        tag: form.tag,
        description: form.description,
        birthdate: form.birthdate ?? undefined,
        username: form.username,
        password: form.password,
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    form,
    resetForm,
    validateForm,
    submitForm,
  }
})

interface SignUpForm {
  name: string
  tag: string
  description: string
  birthdate: Date | null
  username: string
  password: string
}
