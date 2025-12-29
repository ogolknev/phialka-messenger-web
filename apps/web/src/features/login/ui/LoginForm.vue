<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
    <UIInput
      :color="usernameValid ? 'primary' : 'error'"
      v-model="username"
      placeholder="Username..."
      icon="lucide:circle-user"
      :highlight="!usernameValid"></UIInput>
    <UIInput
      :color="passwordValid ? 'primary' : 'error'"
      v-model="password"
      placeholder="Password..."
      :type="showPassword ? 'text' : 'password'"
      icon="lucide:lock"
      :highlight="!passwordValid">
      <template #trailing>
        <Icon
          v-if="showPassword"
          class="
            cursor-pointer text-neutral-400
            hover:text-[var(--color-accent)]
          "
          icon="lucide:eye"
          @click="showPassword = !showPassword"></Icon>
        <Icon
          v-else
          class="
            cursor-pointer text-neutral-400
            hover:text-[var(--color-accent)]
          "
          icon="lucide:eye-off"
          @click="showPassword = !showPassword"></Icon>
      </template>
    </UIInput>

    <div v-if="error" class="flex items-center gap-2 text-error-500">
      <Icon icon="lucide:triangle-alert"></Icon>
      {{ error }}
    </div>

    <div class="flex flex-row-reverse gap-2">
      <UIButton color="primary" type="submit" icon="lucide:log-in">Login</UIButton>
      <UIButton variant="ghost" color="neutral" to="/register">Register</UIButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { HTTPError, UIButton, useAPI } from "@/shared"
import UIInput from "@/shared/ui/input/UIInput.vue"
import { onBeforeMount, ref } from "vue"
import { login } from "../api/login"
import { Icon, loadIcon } from "@iconify/vue"
import { useRouter } from "vue-router"

const router = useRouter()

const error = ref<string>("")

const username = ref("")
const password = ref("")

const showPassword = ref(false)

const passwordValid = ref(true)
const usernameValid = ref(true)

const loginRequest = useAPI(login)
function handleLoginError(loginError: HTTPError) {
  if (loginError.status === 404) {
    error.value = "Username not found"
    usernameValid.value = false
  } else if (loginError.status === 409) {
    error.value = "Incorrect password"
    passwordValid.value = false
  } else error.value = loginError.message
}

async function onSubmit() {
  usernameValid.value = true
  passwordValid.value = true

  await loginRequest.execute({ username: username.value, password: password.value })
  if (!loginRequest.error.value) router.push("/")
  else handleLoginError(loginRequest.error.value)
}

onBeforeMount(() => {
  loadIcon("lucide:eye")
})
</script>
