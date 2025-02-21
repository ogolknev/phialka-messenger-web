<script setup lang="ts">
</script>

<template>
  <div class="tile button button-close">
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.button-close {
  position: relative;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color var(--anim-fade);
}

.button-close:hover {
  border-color: var(--danger-0);

  .line {
    background-color: var(--danger-0);
  }
}

.line {
  position: absolute;
  height: var(--icon-width);
  width: calc(var(--tile-size) * 0.5);
  background-color: var(--icon-clr);
  transition: background-color var(--anim-fade);
}

.line:nth-child(1) {
  transform: rotate(45deg);
}

.line:nth-child(2) {
  transform: rotate(-45deg);
}
</style>
