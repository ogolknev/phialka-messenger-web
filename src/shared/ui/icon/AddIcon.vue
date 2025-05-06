<script setup lang="ts"></script>

<template>
  <div class="add-icon">
    <div class="div line"></div>
    <div class="div line"></div>
  </div>
</template>

<style scoped>
.add-icon {
  position: relative;
  display: grid;
  place-items: center;
}

.line {
  height: var(--line-width-s);
  width: 100%;
  background: currentColor;
  border-radius: var(--border-radius-xs);
}

.line:first-child {
  position: absolute;
  transform: rotate(90deg);
}
</style>
