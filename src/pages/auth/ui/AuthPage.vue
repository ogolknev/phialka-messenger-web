<script setup lang='ts'>
import { SignInWidget, SignUpWidget } from '@/widgets';
import { DefaultButton } from '@/shared';
import { ref } from 'vue';

const mode = ref<'sign-in' | 'sign-up'>('sign-in')

</script>

<template>
  <div class="auth-page">
    <div class="modal tile">
      <header>
        <DefaultButton class="switch-to-sign-in" :class="{ active: mode === 'sign-in' }" @click="mode = 'sign-in'"
          :disabled="mode === 'sign-in'">Sign In
        </DefaultButton>
        <DefaultButton class="switch-to-sign-up" :class="{ active: mode === 'sign-up' }" @click="mode = 'sign-up'"
          :disabled="mode === 'sign-up'">Sign Up
        </DefaultButton>
      </header>
      <SignInWidget v-if="mode === 'sign-in'"></SignInWidget>
      <SignUpWidget v-else></SignUpWidget>
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
  /* border-color: var(--clr-accent); */
  color: var(--clr-accent);
}
</style>
