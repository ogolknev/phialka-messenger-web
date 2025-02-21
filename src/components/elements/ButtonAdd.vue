<script setup lang='ts'>
const { color } = defineProps<{color?: 'success' | 'warning' | 'danger'}>()
</script>

<template>
  <div class="tile button button-add" :class="color">
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.button-add {
  --accent-btn: var(--accent-0);
}

.button-add.success {
  --accent-btn: var(--success-0);
}

.button-add.warning {
  --accent-btn: var(--warning-0);
}

.button-add.danger {
  --accent-btn: var(--danger-0);
}

.button-add {
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

.button-add:hover {
  border-color: var(--accent-btn);

  .line {
    background-color: var(--accent-btn);
  }
}

.line:nth-child(1) {
  transform: rotate(90deg);
}
</style>
