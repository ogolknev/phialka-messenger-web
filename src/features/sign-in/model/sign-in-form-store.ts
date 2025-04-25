import { defineStore } from 'pinia'
import { ref } from 'vue'
import { signIn } from '../api/sign-in'

export const useSignInFormStore = defineStore('sign-in-form', () => {
  const loading = ref(false)
  const username = ref('')
  const password = ref('')

  function resetForm() {
    username.value = ''
    password.value = ''
  }

  function validateForm(): string | void {
    if (!username.value) return 'Username is required'
    if (!password.value) return 'Password is required'
  }

  async function submitForm() {
    const error = validateForm()
    if (error) return error

    try {
      loading.value = true
      await signIn({
        username: username.value,
        password: password.value,
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    username,
    password,
    resetForm,
    submitForm,
    validateForm,
  }
})
