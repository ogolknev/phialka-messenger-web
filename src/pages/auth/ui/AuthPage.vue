<script setup lang='ts'>
import { SignInWidget, SignUpWidget } from '@/widgets';
import { DefaultButton } from '@/shared';
import { ref } from 'vue';

const mode = ref<'sign-in' | 'sign-up'>('sign-in')

</script>

<template>
  <div class="auth-page">
    <header>
      <DefaultButton @click="mode = 'sign-in'">Sign In</DefaultButton>
      <DefaultButton @click="mode = 'sign-up'">Sign Up</DefaultButton>
    </header>
    <SignInWidget v-if="mode === 'sign-in'"></SignInWidget>
    <SignUpWidget v-else></SignUpWidget>
  </div>
</template>
