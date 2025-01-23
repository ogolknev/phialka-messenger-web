<script setup lang="ts">

const { src } = defineProps<{ src?: string }>()
</script>

<template>
    <div class="thumbnail-element">
      <img :src="src">
    </div>
</template>

<style scoped>
.thumbnail-element {
  position: relative;
  height: calc(var(--tile-size) * 0.7);
  width: calc(var(--tile-size) * 0.7);
  border-radius: 50%;
  overflow: hidden;

  img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  img:not([src]) {
    visibility: hidden;
  }
}
</style>
