<script setup lang='ts'>

const { type = 'button', disabled = false } = defineProps<{ type?: 'button' | 'submit' | 'reset', disabled?: boolean }>()

</script>

<template>
  <div class="default-button button">
    <button :type="type" :disabled="disabled" class="tile">
      <slot></slot>
    </button>
  </div>
</template>

<style scoped>
@import './style/main.css';
</style>
