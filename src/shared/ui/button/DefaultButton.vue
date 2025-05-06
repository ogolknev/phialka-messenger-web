<script setup lang="ts">
const { type = 'button', disabled = false } = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}>()
</script>

<template>
  <button class="default-button button tile" :type="type" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style scoped>
@import './style/main.css';
</style>
