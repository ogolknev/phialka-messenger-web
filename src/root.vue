<script setup></script>

<template>
  <header></header>
  <main>
    <router-view></router-view>
  </main>
</template>

<style scoped>
header {
  position: absolute;
  height: var(--tile-size);
  width: 100%;
}
main {
  height: 100%;
  padding-top: var(--tile-size);
}
</style>
