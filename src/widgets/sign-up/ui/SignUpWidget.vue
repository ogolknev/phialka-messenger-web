<script setup lang="ts">
import { useSignUpFormStore } from '@/features'
import { TextInput, TextArea, DateInput, DefaultButton } from '@/shared'
import { ref } from 'vue'

const emit = defineEmits<{ signUp: [username: string, password: string] }>()
const signUpFormStore = useSignUpFormStore()
const error = ref('')

async function submitSignUp() {
  error.value = (await signUpFormStore.submitForm()) || ''
  if (!error.value) emit('signUp', signUpFormStore.form.username, signUpFormStore.form.password)
}
</script>

<template>
  <div class="sign-up-widget">
    <form class="sign-up-form" @submit.prevent="submitSignUp">
      <TextInput v-model="signUpFormStore.form.name" class="name-input" placeholder="Name"></TextInput>
      <TextInput v-model="signUpFormStore.form.tag" class="tag-input" placeholder="Tag"></TextInput>
      <TextArea v-model="signUpFormStore.form.description" class="description-input" :max-rows="4"
        placeholder="Description"></TextArea>
      <DateInput v-model="signUpFormStore.form.birthdate" class="birthdate-input" placeholder="Birthdate"></DateInput>
      <TextInput v-model="signUpFormStore.form.username" class="username-input" placeholder="Username"></TextInput>
      <TextInput v-model="signUpFormStore.form.password" class="password-input" type="password" placeholder="Password">
      </TextInput>

      <div v-if="error" class="errors">{{ error }}</div>

      <div class="button-container">
        <DefaultButton type="submit">Sign Up</DefaultButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.sign-up-form {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
}

.errors {
  color: var(--clr-danger);
}
</style>
