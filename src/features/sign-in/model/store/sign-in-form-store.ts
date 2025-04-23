import { defineStore } from 'pinia'
import { ref } from 'vue'
import { signIn } from '../../api/sign-in'

export const useSignInFormStore = defineStore('sign-in-form', () => {
  const username = ref('')
  const password = ref('')

  function reset() {
    username.value = ''
    password.value = ''
  }

  function validate(): string | void {
    if (!username.value) return 'Username is required'
    if (!password.value) return 'Password is required'
  }

  async function submit() {
    const error = validate()
    if (error) return error

    try {
      await signIn({
        username: username.value,
        password: password.value,
      })
    } catch (error) {
      return error instanceof Error ? error.message : 'Unknown error'
    }
  }

  return {
    username,
    password,
    reset,
    submit,
    validate,
  }
})
