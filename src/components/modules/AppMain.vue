<script setup lang="ts">
import { useRouter } from 'vue-router'

import ServerListComponent from '@/components/components/NavOfServers.vue'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useStore } from '@/store'
import api from '@/api'

const router = useRouter()
const store = useStore()

const getServerInterval = ref<number>()
const isAuth = computed(() => store.profile !== null)

function onClickServer(serverId: string) {
  store.selectedServerID = serverId
}

function onClickCreateServer() {
  router.push('/servers/create')
}

function onClickEditServer(serverId: string) {
  router.push('/servers/edit/' + serverId)
}

async function getServers() {
  if (isAuth.value) {
    store.servers = await api.servers.getServers()
  }
}

onMounted(() => {
  nextTick(async () => {
    await getServers()
    getServerInterval.value = setInterval(() => {
      getServers()
    }, 5000)
  })
})

onBeforeUnmount(() => {
  clearInterval(getServerInterval.value)
  console.log('unmount')
})
</script>

<template>
  <div v-if="isAuth" class="app-main">
    <server-list-component
      :servers="store.servers"
      :selected-server-id="store.selectedServerID"
      @click-server="onClickServer"
      @click-create-server="onClickCreateServer"
      @click-edit-server="onClickEditServer"
    ></server-list-component>
    <div class="chat-list-module"></div>
    <div class="messages-area-module"></div>
  </div>
  <div v-else class="not-auth-container">Please, sign in or register</div>
</template>

<style scoped>
.app-main {
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
  color: var(--danger-0);
  font-size: var(--text-xl);
}
</style>
