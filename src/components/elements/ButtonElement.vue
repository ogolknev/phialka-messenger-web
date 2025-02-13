<script setup lang="ts">
const { color } = defineProps<{ color?: 'success' | 'warning' | 'danger' }>()
</script>

<template>
  <div
    tabindex="0"
    class="tile button button-element"
    :class="color"
  >
    <slot>Button</slot>
  </div>
</template>

<style scoped>
.button-element {
  --accent-btn: var(--accent);
}

.button-element.success {
  --accent-btn: var(--success);
}

.button-element.warning {
  --accent-btn: var(--warning);
}

.button-element.danger {
  --accent-btn: var(--danger);
}

.button-element {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--gap);
  padding-block: calc(var(--gap) / 2);
  color: var(--text);
  font: inherit;
  font-size: var(--text-s);
  cursor: pointer;
  user-select: none;
  transition:
    color var(--animation-focus-duration) var(--animation-focus-function),
    border-color var(--animation-focus-duration) var(--animation-focus-function);
}

.button-element:hover,
.button-element:focus {
  color: var(--accent-btn);
  border-color: var(--accent-btn);
}
</style>
