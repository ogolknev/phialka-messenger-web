<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ServerEditFormComponent from '@/components/ServerEditFormComponent.vue';
import CloseButtonElement from '@/elements/CloseButtonElement.vue';
import CropImageComponent from '@/components/CropImageComponent.vue';
import { getCanvasBlob } from '@/composables/shared';
import api from '@/api';
import { useStore } from '@/store';

const title = ref('')
const description = ref('')
const server = ref<API.Server>()
const iconUrl = ref<string | null>(null)
const iconUrlCropped = ref<string>()
const iconBlob = ref<Blob>()

const route = useRoute()
const router = useRouter()
const store = useStore()

function onClose() {
  router.push("/")
}

function onIconLoad(url: string) {
  iconUrl.value = url
}

async function onIconCrop(canvas: HTMLCanvasElement) {
  iconUrlCropped.value = canvas.toDataURL()
  iconUrl.value = null
  iconBlob.value = await getCanvasBlob(canvas)
}

async function onClickEdit() {
  await api.servers.editServer(route.params.id as string, {
    title: title.value,
    description: description.value
  })
  if (iconBlob.value){
    const formData = new FormData()
    formData.append('logo', iconBlob.value)
    await api.servers.setServerIcon(route.params.id as string, formData)
  }
  title.value = ''
  description.value = ''
  router.push('/')
}

async function onClickRemove() {
  await api.servers.removeServer(route.params.id as string)
  title.value = ''
  description.value = ''
  router.push('/')
}

onMounted(() => {
  server.value = store.servers.find((value) => value.server_id === route.params.id)
  title.value = server.value?.title ?? ''
  description.value = server.value?.description ?? ''
  if (server.value?.logo?.download_id) iconUrlCropped.value = import.meta.env.VITE_API_BASE_URL + "/files/download/" + server.value?.logo?.download_id
})
</script>

<template>
  <div class="server-edit-module main-content">
    <header class="server-edit-form-header">
      <div class="tile title">Server</div>
      <close-button-element @click="onClose"></close-button-element>
    </header>
    <server-edit-form-component
      v-model:title="title"
      v-model:description="description"
      :src="iconUrlCropped"
      @icon-load="onIconLoad"
      @click-edit="onClickEdit"
      @click-remove="onClickRemove"
    ></server-edit-form-component>
  </div>
  <teleport
    v-if="iconUrl"
    to=".app-overlay-module"
  >
    <crop-image-component
      :src="iconUrl"
      @cancel="iconUrl = null"
      @crop="onIconCrop"
    ></crop-image-component>
  </teleport>
</template>

<style scoped>
.server-edit-form-header {
  display: flex;
  flex-flow: row nowrap;
  gap: var(--gap);

  .title {
    width: fit-content;
    padding-inline: var(--gap);
    flex-grow: 1;
    font-size: var(--text-m);
    color: var(--warning);
    border-color: var(--warning);
  }
}

.server-edit-form-component {
  margin-top: var(--gap);
}
</style>
