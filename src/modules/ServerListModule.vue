<script setup lang='ts'>
import AddButtonElement from '@/elements/AddButtonElement.vue';
</script>

<template>
  <div class="server-list-module">
    <add-button-element color='success'></add-button-element>
  </div>
</template>

<style scoped>
.server-list-module {
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap);
  overflow-y: auto;
}
</style>
