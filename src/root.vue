<script setup>

import MainHeaderComponent from './components/MainHeaderComponent.vue';

</script>

<template>
  <main-header-component></main-header-component>
  <main>
    <router-view></router-view>
  </main>
</template>

<style>
#app {
  box-sizing: border-box;
  padding: var(--gap);
  display: grid;
  grid-template-rows: var(--tile-size) 1fr;
  gap: var(--gap);
}
</style>

<style scoped>
</style>
