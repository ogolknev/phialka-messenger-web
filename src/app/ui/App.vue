<script setup lang='ts'>
import './style/main.css';
import { MainHeaderWidget } from '@/widgets';
</script>

<template>
  <div class="app">
    <header>
      <MainHeaderWidget></MainHeaderWidget>
    </header>
    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style scoped>
.app {
  height: 100dvh;
  display: grid;
  grid-template-rows: 5rem 1fr;
}

main {
  height: 100%;
}
</style>
