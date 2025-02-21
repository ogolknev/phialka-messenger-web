<script setup lang='ts'>
</script>

<template>
  <div class="tile toast-default">
    <slot></slot>
  </div>
</template>

<style scoped>
.toast-default {
  width: fit-content;
  max-width: calc(var(--tile-size) * 8);
  height: fit-content;
  min-height: var(--tile-size);
  display: grid;
  place-content: center;
  padding-inline: var(--gap);
  padding-block: calc(var(--gap) / 2);
  text-align: center;
  white-space: pre-line;
}
</style>
