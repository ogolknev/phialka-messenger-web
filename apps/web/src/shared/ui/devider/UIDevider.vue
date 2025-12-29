<template>
  <div class="flex h-5 items-center gap-4 font-light text-neutral-700">
    <div class="h-px grow-1 bg-neutral-800" :class="props.ui?.lineClass"></div>
    <slot></slot>
    <div
      v-if="$slots.default"
      class="h-px grow-1 bg-neutral-800"
      :class="props.ui?.lineClass"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ ui?: { lineClass?: string } }>()
</script>
