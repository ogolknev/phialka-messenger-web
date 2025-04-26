<script setup lang="ts">
const model = defineModel<string>()
const { type = 'text', placeholder } = defineProps<{
  type?: 'password' | 'text'
  placeholder?: string
}>()
</script>

<template>
  <input v-model="model" class="text-input input tile" :type="type" :placeholder="placeholder" />
</template>

<style scoped>
@import './style/main.css';
</style>
