import { defineStore } from 'pinia'
import { ref } from 'vue'
import { signUp } from '../api/sign-up'

export const useSignUpFormStore = defineStore('sign-up-form', () => {
  const loading = ref(false)

  const name = ref('')
  const tag = ref('')
  const description = ref('')
  const birthdate = ref<Date | null>(null)
  const username = ref('')
  const password = ref('')

  function resetForm(): void {
    name.value = ''
    tag.value = ''
    description.value = ''
    birthdate.value = null
    username.value = ''
    password.value = ''
  }

  function validateForm(): string | void {
    if (!name.value) return 'Name is required'
    if (!username.value) return 'Username is required'
    if (!password.value) return 'Password is required'
  }

  async function submitForm(): Promise<string | void> {
    const error = validateForm()
    if (error) return error

    try {
      loading.value = true

      await signUp({
        name: name.value,
        tag: tag.value,
        description: description.value,
        birthdate: birthdate.value ?? undefined,
        username: username.value,
        password: password.value,
      })
    } finally {
      loading.value = false
    }
  }

  return {
    name,
    tag,
    description,
    birthdate,
    username,
    password,
    resetForm,
    validateForm,
    submitForm,
  }
})
