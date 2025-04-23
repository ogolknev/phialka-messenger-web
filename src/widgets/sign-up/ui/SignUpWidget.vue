<script setup lang='ts'>
import { useSignUpFormStore } from '@/features';
import { TextInput, TextArea, DateInput, DefaultButton } from '@/shared';
import { ref } from 'vue';

const signUpFormStore = useSignUpFormStore()
const error = ref('')

async function submitSignUp() {
  error.value = await signUpFormStore.submit() || ''
}

</script>

<template>
  <div class="auth-widget">
    <form class="sign-up-form" @submit.prevent="submitSignUp">

      <TextInput v-model="signUpFormStore.name" class="name-input"></TextInput>
      <TextInput v-model="signUpFormStore.tag" class="tag-input"></TextInput>
      <TextArea v-model="signUpFormStore.description" class="description-input" :max-rows="4"></TextArea>
      <DateInput v-model="signUpFormStore.birthdate" class="birthdate-input"></DateInput>
      <TextInput v-model="signUpFormStore.username" class="username-input"></TextInput>
      <TextInput v-model="signUpFormStore.password" class="password-input" type='password'></TextInput>

      <div v-if="error" class="errors">{{ error }}</div>

      <div class="button-container">
        <DefaultButton type='submit'>Sign Up</DefaultButton>
      </div>

    </form>
  </div>
</template>
