<script setup lang='ts'>

const model = defineModel<string>()
const { type = 'text', placeholder } = defineProps<{ type?: 'password' | 'text', placeholder?: string }>()

</script>

<template>
  <div class="text-input input tile">
    <input v-model="model" :type="type" :placeholder="placeholder">
  </div>
</template>

<style scoped>
@import './style/main.css';
</style>
