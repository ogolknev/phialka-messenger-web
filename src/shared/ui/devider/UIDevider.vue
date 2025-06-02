<template>
  <div class="flex gap-4 items-center text-neutral-700 font-light">
    <div class="h-px bg-neutral-800 grow-1 my-4" :class="props.ui?.lineClass"></div>
    <slot></slot>
    <div
      v-if="$slots.default"
      class="h-px bg-neutral-800 grow-1 my-4"
      :class="props.ui?.lineClass"
    ></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ ui?: { lineClass?: string } }>()
</script>
