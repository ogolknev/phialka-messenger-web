<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
    <div class="grid gap-3">
      <UIInput
        color="primary"
        v-model="name"
        placeholder="Name..."
        icon="lucide:user-pen"></UIInput>
      <UIInput
        color="primary"
        v-model="username"
        placeholder="Username..."
        icon="lucide:circle-user"></UIInput>
      <UIInput
        color="primary"
        v-model="password"
        placeholder="Password..."
        :type="showPassword ? 'text' : 'password'"
        icon="lucide:lock">
        <template #trailing>
          <Icon
            v-if="showPassword"
            class="
              cursor-pointer text-neutral-400
              hover:text-primary-500
            "
            icon="lucide:eye"
            @click="showPassword = !showPassword"></Icon>
          <Icon
            v-else
            class="
              cursor-pointer text-neutral-400
              hover:text-primary-500
            "
            icon="lucide:eye-off"
            @click="showPassword = !showPassword"></Icon>
        </template>
      </UIInput>
    </div>

    <div class="flex flex-row-reverse gap-2">
      <UIButton color="primary" type="submit" icon="lucide:user-plus">Register</UIButton>
      <UIButton color="neutral" variant="ghost" to="/login">Login</UIButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { UIButton, UIInput, useAPI } from "@/shared"
import { ref } from "vue"
import { register } from "../api/register"
import { Icon } from "@iconify/vue"

const showPassword = ref(false)

const name = ref("")
const username = ref("")
const password = ref("")

const registerRequest = useAPI(register)

async function onSubmit() {
  await registerRequest.execute({
    name: name.value,
    username: username.value,
    password: password.value,
  })
}
</script>
