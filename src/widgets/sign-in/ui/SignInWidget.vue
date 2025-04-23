<script setup lang='ts'>
import { useSignInFormStore } from '@/features';
import { TextInput, DefaultButton } from '@/shared';
import { ref } from 'vue';

const signInFormStore = useSignInFormStore()
const error = ref('')

async function submitSignIn() {
  error.value = await signInFormStore.submit() || ''
}

</script>

<template>
  <div class="auth-widget">
    <form class="sign-in-form" @submit.prevent="submitSignIn">

      <TextInput v-model="signInFormStore.username" class="username-input"></TextInput>
      <TextInput v-model="signInFormStore.password" class="password-input" type='password'></TextInput>

      <div v-if="error" class="errors">{{ error }}</div>

      <div class="button-container">
        <DefaultButton type='submit'>Sign In</DefaultButton>
      </div>

    </form>
  </div>
</template>
