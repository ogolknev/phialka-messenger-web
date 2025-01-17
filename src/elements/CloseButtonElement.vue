<script setup lang="ts">
import TileElement from './TileElement.vue';
</script>

<template>
  <tile-element class="close-button-element">
    <div class="line"></div>
    <div class="line"></div>
  </tile-element>
</template>

<style scoped>
.close-button-element {
  position: relative;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: border-color 200ms ease-out;
}

.close-button-element:hover {
  border-color: var(--danger);

  .line {
    background-color: var(--danger);
  }
}

.line {
  position: absolute;
  height: 2px;
  width: 2.5rem;
  background-color: var(--icon);
  transition: background-color 200ms ease-out;
}

.line:nth-child(1) {
  transform: rotate(45deg);
}

.line:nth-child(2) {
  transform: rotate(-45deg);
}
</style>
