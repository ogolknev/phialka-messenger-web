<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/store/profile';
import { useServersStore } from '@/store/servers';

import ServerListComponent from '@/components/ServerListComponent.vue';
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';


const router = useRouter()
const profileStore = useProfileStore()
const serversStore = useServersStore()

const getServerInterval = ref<number>()
const isAuth = computed(() => profileStore.profile !== null)

function onClickServer(serverId: string) {
  serversStore.selectedServerId = serverId
  console.log(serversStore.selectedServerId)
}

function onClickCreateServer() {
  router.push('/servers/create')
}

function onClickEditServer(serverId: string) {
  router.push('/servers/edit/' + serverId)
}

async function getServers() {
  if (isAuth.value) await serversStore.getServers()
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

  <div
    v-if="isAuth"
    class="main-view"
  >
    <server-list-component
      :servers="serversStore.servers"
      :selected-server-id="serversStore.selectedServerId"
      @click-server="onClickServer"
      @click-create-server="onClickCreateServer"
      @click-edit-server="onClickEditServer"
    ></server-list-component>
    <div class="chat-list-module"></div>
    <div class="messages-area-module"></div>
  </div>
  <div
    v-else
    class="not-auth-container"
  >
    Please, sign in or register
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
