<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import ServerCreateFormComponent from '@/components/ServerCreateFormComponent.vue';
import CloseButtonElement from '@/elements/CloseButtonElement.vue';
import CropImageComponent from '@/components/CropImageComponent.vue';
import api from '@/api';

const title = ref('')
const description = ref('')
const iconUrl = ref<string | null>(null)
const iconUrlCropped = ref<string>()

const router = useRouter()

function onClose() {
  router.push("/")
}

function onIconLoad(url: string) {
  iconUrl.value = url
}

function onIconCrop(canvas: HTMLCanvasElement) {
  iconUrlCropped.value = canvas.toDataURL()
  iconUrl.value = null
}

async function onClickCreate() {
  await api.servers.createServer({ title: title.value, description: description.value })
  title.value = ''
  description.value = ''
  router.push('/')
}
</script>

<template>
  <div class="server-create-module main-content">
    <header class="server-create-form-header">
      <div class="tile title">Server</div>
      <close-button-element @click="onClose"></close-button-element>
    </header>
    <server-create-form-component
      v-model:title="title"
      v-model:description="description"
      :src="iconUrlCropped"
      @icon-load="onIconLoad"
      @click-create="onClickCreate"
    ></server-create-form-component>
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

.server-create-form-header {
  display: flex;
  flex-flow: row nowrap;
  gap: var(--gap);

  .title {
    width: fit-content;
    padding-inline: var(--gap);
    flex-grow: 1;
    font-size: var(--text-m);
    color: var(--success);
    border-color: var(--success);
  }
}

.server-create-form-component {
  margin-top: var(--gap);
}
</style>
