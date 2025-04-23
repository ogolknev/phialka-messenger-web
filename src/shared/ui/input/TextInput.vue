<script setup lang='ts'>

const model = defineModel<string>()
const { type = 'text' } = defineProps<{ type?: 'password' | 'text' }>()

</script>

<template>
  <div class="text-input">
    <input v-model="model" :type="type">
  </div>
</template>
