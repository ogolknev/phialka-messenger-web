<script setup lang='ts'>
import './style/main.css'
</script>

<template>
  <div class="app">
    <header>
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
  grid-template-rows: 10rem 1fr;
}

main {
  height: 100%;
}
</style>
