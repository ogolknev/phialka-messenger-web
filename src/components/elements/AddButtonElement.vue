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
  --accent-btn: var(--accent-0);
}

.add-button-element.success {
  --accent-btn: var(--success-0);
}

.add-button-element.warning {
  --accent-btn: var(--warning-0);
}

.add-button-element.danger {
  --accent-btn: var(--danger-0);
}

.add-button-element {
  position: relative;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color var(--anim-fade);

  .line {
    position: absolute;
    height: var(--icon-width);
    width: 40%;
    background-color: var(--icon-clr);
    transition: background-color var(--anim-fade);
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
