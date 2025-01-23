<script setup lang="ts">
</script>

<template>
  <div class="tile close-button-element">
    <div class="line"></div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.close-button-element {
  position: relative;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color var(--animation-focus-duration) var(--animation-focus-function);
}

.close-button-element:hover {
  border-color: var(--danger);

  .line {
    background-color: var(--danger);
  }
}

.line {
  position: absolute;
  height: var(--icon-width);
  width: calc(var(--tile-size) * 0.5);
  background-color: var(--icon);
  transition: background-color var(--animation-focus-duration) var(--animation-focus-function);
}

.line:nth-child(1) {
  transform: rotate(45deg);
}

.line:nth-child(2) {
  transform: rotate(-45deg);
}
</style>
