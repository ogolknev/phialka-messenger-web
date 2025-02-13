<script setup lang='ts'>
const { color } = defineProps<{color?: 'success' | 'warning' | 'danger'}>()
</script>

<template>
  <div class="add-button-element tile" :class="color">
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.add-button-element {
  --accent-btn: var(--accent);
}

.add-button-element.success {
  --accent-btn: var(--success);
}

.add-button-element.warning {
  --accent-btn: var(--warning);
}

.add-button-element.danger {
  --accent-btn: var(--danger);
}

.add-button-element {
  position: relative;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color var(--animation-focus-duration) var(--animation-focus-function);

  .line {
    position: absolute;
    height: var(--icon-width);
    width: 40%;
    background-color: var(--icon);
    transition: background-color var(--animation-focus-duration) var(--animation-focus-function);
  }
}

.add-button-element:hover {
  border-color: var(--accent-btn);

  .line {
    background-color: var(--accent-btn);
  }
}

.line:nth-child(1) {
  transform: rotate(90deg);
}
</style>
