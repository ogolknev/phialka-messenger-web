<script setup lang="ts">
import { ref } from 'vue';

import TileElement from '@/elements/TileElement.vue';
import CloseButtonElement from '@/elements/CloseButtonElement.vue';
import SignUpFormComponent from '@/components/SignUpFormComponent.vue';
import SignInFormComponent from '@/components/SignInFormComponent.vue';
import { useAuthStore } from '@/store/auth';
import { useProfileStore } from '@/store/profile';
import { useRouter } from 'vue-router';

const isSignUpForm = ref(false)
const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const signInFormInitial = {
  username: "",
  password: ""
}
const signInForm = ref({ ...signInFormInitial })

const signUpFormInitial = {
  name: "",
  username: "",
  password: ""
}
const signUpForm = ref({ ...signUpFormInitial })

async function signIn(authData=signInForm.value) {
  await authStore.signIn(authData)
  signInForm.value = { ...signInFormInitial }
  profileStore.getProfile()
  router.push("/")
}

async function signUp() {
  await authStore.signUp(signUpForm.value)
  await signIn({ username: signUpForm.value.username, password: signUpForm.value.password })
  signUpForm.value = { ...signUpFormInitial }
}

</script>

<template>
  <div class="auth-view">
    <div class="navbar">
      <tile-element class="to-sign-in-form nav-entry" :class="{ active: !isSignUpForm }"
        @click="isSignUpForm = false">Sign In</tile-element>
      <tile-element class="to-sign-up-form nav-entry" :class="{ active: isSignUpForm }"
        @click="isSignUpForm = true">Sign Up</tile-element>
      <close-button-element></close-button-element>
    </div>
    <sign-up-form-component v-if="isSignUpForm" v-model="signUpForm" @sign-up="signUp"></sign-up-form-component>
    <sign-in-form-component v-else v-model="signInForm" @sign-in="() => signIn()"></sign-in-form-component>
  </div>
</template>

<style scoped>
.auth-view {
  margin-top: var(--gap);
  margin-inline: auto;
  width: 40rem;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.form {
  margin-top: var(--gap);
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap);
}

.navbar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: var(--gap);
  width: 100%;
}

.nav-entry {
  display: grid;
  place-items: center;
  padding-inline: var(--gap);
  min-width: fit-content;
  font-size: var(--text-m);
  color: var(--text);
  cursor: pointer;
  user-select: none;
  transition:
    flex-grow 200ms ease-out,
    border-color 200ms ease-out,
    color 200ms ease-out;
}

.nav-entry.active {
  flex-grow: 1;
}

.to-sign-in-form.active,
.to-sign-in-form:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.to-sign-up-form.active,
.to-sign-up-form:hover {
  border-color: var(--success);
  color: var(--success);
}

.name-input,
.login-input,
.password-input {
  width: 100%;
}

.button-container {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: end;
}
</style>
