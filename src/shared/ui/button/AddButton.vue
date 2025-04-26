<script setup lang='ts'>
import DefaultButton from './DefaultButton.vue';
import { AddIcon } from '../icon';
</script>

<template>
  <DefaultButton class="add-button">
    <AddIcon></AddIcon>
  </DefaultButton>
</template>

<style scoped>
.add-button {
  padding: var(--gap-size-l);
}
</style>
