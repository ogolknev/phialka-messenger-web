<script setup lang="ts">
import { useSignInFormStore } from '@/features'
import { TextInput, DefaultButton } from '@/shared'
import { ref } from 'vue'

const emit = defineEmits<{ signIn: [] }>()
const signInFormStore = useSignInFormStore()
const error = ref('')

async function submitSignIn() {
  error.value = (await signInFormStore.submitForm()) || ''
  if (!error.value) {
    emit('signIn')
  }
}
</script>

<template>
  <div class="sign-in-widget">
    <form class="sign-in-form" @submit.prevent="submitSignIn">
      <TextInput
        v-model="signInFormStore.form.username"
        class="username-input"
        placeholder="Username"
      ></TextInput>
      <TextInput
        v-model="signInFormStore.form.password"
        class="password-input"
        type="password"
        placeholder="Password"
      ></TextInput>

      <div v-if="error" class="errors">
        {{ error }}
      </div>

      <div class="button-container">
        <DefaultButton type="submit">Sign In</DefaultButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.sign-in-form {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
}

.errors {
  color: var(--clr-danger);
}
</style>
