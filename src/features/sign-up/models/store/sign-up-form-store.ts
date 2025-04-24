import { defineStore } from 'pinia'
import { ref } from 'vue'
import { signUp } from '../../api/sign-up'

export const useSignUpFormStore = defineStore('sign-up-form', () => {
  const name = ref('')
  const tag = ref('')
  const description = ref('')
  const birthdate = ref<Date | null>(null)
  const username = ref('')
  const password = ref('')

  function reset(): void {
    name.value = ''
    tag.value = ''
    description.value = ''
    birthdate.value = null
    username.value = ''
    password.value = ''
  }

  function validate(): string | void {
    if (!name.value) return 'Name is required'
    if (!username.value) return 'Username is required'
    if (!password.value) return 'Password is required'
  }
  
  async function submit(): Promise<string | void> {
    const error = validate()
    if (error) return error

    try {
      await signUp({
        name: name.value,
        tag: tag.value,
        description: description.value,
        birthdate: birthdate.value ?? undefined,
        username: username.value,
        password: password.value,
      })
    } catch (error) {
      return error instanceof Error ? error.message : 'Unknown error'
    }
  }

  return {
    name,
    tag,
    description,
    birthdate,
    username,
    password,
    reset,
    validate,
    submit,
  }
})
