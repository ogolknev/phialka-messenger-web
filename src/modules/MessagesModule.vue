<script setup lang='ts'>
import { useProfileStore } from '@/store/profile';

import ServerListModule from '@/modules/ServerListModule.vue';

const profileStore = useProfileStore()
</script>

<template>
  <div
    v-if="profileStore.profile === null"
    class="not-auth-container"
  >
    Please, sign in or register
  </div>
  <div
    v-else
    class="main-view"
  >
    <server-list-module></server-list-module>
    <div class="chat-list-module"></div>
    <div class="messages-area-module"></div>
  </div>
</template>

<style scoped>
.main-view {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: var(--tile-size) 10rem 1fr;
  grid-template-rows: 1fr;
  gap: var(--gap);
}

.not-auth-container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
  color: var(--danger);
  font-size: var(--text-xl);

}
</style>
