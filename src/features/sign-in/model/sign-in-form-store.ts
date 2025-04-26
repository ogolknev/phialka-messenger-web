import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { signIn } from '../api'

export const useSignInFormStore = defineStore('sign-in-form', () => {
  const loading = ref(false)

  const form = reactive<SignInForm>({
    username: '',
    password: '',
  })

  function resetForm() {
    form.username = ''
    form.password = ''
  }

  function validateForm(): string | void {
    if (!form.username) return 'Username is required'
    if (!form.password) return 'Password is required'
  }

  async function submitForm() {
    const error = validateForm()
    if (error) return error

    try {
      loading.value = true
      await signIn({
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
    submitForm,
    validateForm,
  }
})

interface SignInForm {
  username: string
  password: string
}
