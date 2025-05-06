<script setup lang="ts">
import { SignInWidget, SignUpWidget } from '@/widgets'
import { DefaultButton } from '@/shared'
import { ref } from 'vue'
import { useSignInFormStore } from '@/features'
import { useProfileStore } from '@/entities/profile'
import { useRouter } from 'vue-router'

const router = useRouter()
const signInFormStore = useSignInFormStore()
const profileStore = useProfileStore()
const mode = ref<'sign-in' | 'sign-up'>('sign-in')

async function onSignIn() {
  await profileStore.updateProfile()
  router.back()
}

async function onSignUp(username: string, password: string) {
  signInFormStore.form.username = username
  signInFormStore.form.password = password
  const error = await signInFormStore.submitForm()
  if (error) throw new Error(error)
  router.back()
}
</script>

<template>
  <div class="auth-page">
    <div class="modal tile">
      <header>
        <DefaultButton
          class="switch-to-sign-in"
          :class="{ active: mode === 'sign-in' }"
          @click="mode = 'sign-in'"
          :disabled="mode === 'sign-in'"
          >Sign In
        </DefaultButton>
        <DefaultButton
          class="switch-to-sign-up"
          :class="{ active: mode === 'sign-up' }"
          @click="mode = 'sign-up'"
          :disabled="mode === 'sign-up'"
          >Sign Up
        </DefaultButton>
      </header>
      <SignInWidget v-if="mode === 'sign-in'" @sign-in="onSignIn"></SignInWidget>
      <SignUpWidget v-else @sign-up="onSignUp"></SignUpWidget>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  width: 100%;
  height: 100%;
  display: grid;
}

.modal {
  place-self: center;
  width: fit-content;
  padding: var(--gap-size-l);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
  background: var(--clr-bg);
}

header {
  display: flex;
  flex-flow: row nowrap;
}

.switch-to-sign-in {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.switch-to-sign-up {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.switch-to-sign-in.active,
.switch-to-sign-up.active {
  color: var(--clr-accent);
}
</style>
