<template>
  <Teleport to="#overlay">
    <div
      class="backdrop fixed inset-0 size-full"
      :class="backdropDarken ? 'bg-neutral-950/60' : ''"
      :style="{ pointerEvents: backdropPointerEvents }">
      <slot></slot>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { backdropPointerEvents = "none", backdropDarken } = defineProps<{
  backdropPointerEvents?: "auto" | "none"
  backdropDarken?: boolean
}>()
</script>
