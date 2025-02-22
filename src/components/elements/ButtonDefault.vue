<script setup lang="ts">
const { color } = defineProps<{ color?: 'success' | 'warning' | 'danger' }>()
</script>

<template>
  <button class="tile button button-default" :class="color">
    <slot>Button</slot>
  </button>
</template>

<style scoped>
.button-default {
  --accent-btn: var(--accent-0);
}

.button-default.success {
  --accent-btn: var(--success-0);
}

.button-default.warning {
  --accent-btn: var(--warning-0);
}

.button-default.danger {
  --accent-btn: var(--danger-0);
}

.button-default {
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--gap);
  padding-block: var(--gap);
  color: var(--text-clr);
  font: inherit;
  font-size: var(--text-s);
  cursor: pointer;
  user-select: none;
  transition:
    color var(--anim-fade),
    border-color var(--anim-fade);
}

.button-default:hover,
.button-default:focus {
  color: var(--accent-btn);
  border-color: var(--accent-btn);
}
</style>
