<script setup lang='ts'>

const { type = 'button', disabled = false } = defineProps<{ type?: 'button' | 'submit' | 'reset', disabled?: boolean }>()

</script>

<template>
  <div class="default-button">
    <button :type="type" :disabled="disabled">
      <slot></slot>
    </button>
  </div>
</template>
