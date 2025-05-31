<template>
  <div class="dev-page">
    <UserSelect></UserSelect>
  </div>
</template>

<script setup lang="ts">
import { UserSelect } from '@/widgets'
</script>

<style scoped>
.dev-page {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
</style>
