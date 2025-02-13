<script setup lang="ts">
import { ref } from 'vue';

import CloseButtonElement from '../elements/CloseButtonElement.vue';
import SignUpFormComponent from '@/components/components/SignUpFormComponent.vue';
import SignInFormComponent from '@/components/components/SignInFormComponent.vue';
import { useRouter } from 'vue-router';
import api from '@/api';
import { useStore } from '@/store';

const mode = ref<'sign-in' | 'sign-up'>('sign-in')
const router = useRouter()
const store = useStore()

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

async function signIn(authData = signInForm.value) {
  await api.auth.signIn(authData)
  signInForm.value = { ...signInFormInitial }
  store.profile = await api.profile.getProfile()
  router.push("/")
}

async function signUp() {
  await api.auth.signUp(signUpForm.value)
  await signIn({ username: signUpForm.value.username, password: signUpForm.value.password })
  signUpForm.value = { ...signUpFormInitial }
}

function onClose() {
  router.push("/")
}

</script>

<template>
  <div class="auth-view">
    <div class="navbar">
      <div
        class="tile to-sign-in-form nav-entry"
        :class="{ active: mode === 'sign-in' }"
        @click="mode = 'sign-in'"
      >Sign In</div>
      <div
        class="tile to-sign-up-form nav-entry"
        :class="{ active: mode === 'sign-up' }"
        @click="mode = 'sign-up'"
      >Sign Up</div>
      <close-button-element
        class="nav-entry"
        @click="onClose"
      ></close-button-element>
    </div>
    <sign-up-form-component
      v-if="mode === 'sign-up'"
      v-model:name="signUpForm.name"
      v-model:username="signUpForm.username"
      v-model:password="signUpForm.password"
      @sign-up="signUp"
    ></sign-up-form-component>
    <sign-in-form-component
      v-else
      v-model:username="signInForm.username"
      v-model:password="signInForm.password"
      @sign-in="() => signIn()"
    ></sign-in-form-component>
  </div>
</template>

<style scoped>
.auth-view {
  margin-top: var(--gap);
  margin-inline: auto;
  max-width: var(--max-content-width);
  width: 80%;
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
  flex-shrink: 0;
  font-size: var(--text-m);
  color: var(--text-clr);
  cursor: pointer;
  user-select: none;
  transition:
    flex-grow 200ms ease-out,
    border-color var(--anim-fade),
    color var(--anim-fade);
}

.nav-entry.active {
  flex-grow: 1;
}

.to-sign-in-form.active,
.to-sign-in-form:hover {
  border-color: var(--accent-0);
  color: var(--accent-0);
}

.to-sign-up-form.active,
.to-sign-up-form:hover {
  border-color: var(--success-0);
  color: var(--success-0);
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
