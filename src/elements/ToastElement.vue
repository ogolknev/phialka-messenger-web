<script setup lang='ts'>
import TileElement from './TileElement.vue';
</script>

<template>
  <tile-element class="toast-element"><slot></slot></tile-element>
</template>

<style scoped>
.toast-element {
  width: fit-content;
  height: fit-content;
  min-height: var(--tile-size);
  display: grid;
  place-content: center;
  padding-inline: var(--gap);
  padding-block: calc(var(--gap) / 2);
}
</style>
