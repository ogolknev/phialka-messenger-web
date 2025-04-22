<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import FormServerCreate from '@/components/components/FormServerCreate.vue'
import ButtonClose from '../elements/ButtonClose.vue'
import ImageCropper from '@/components/components/ImageCropper.vue'
import api from '@/api'

const title = ref('')
const description = ref('')
const iconUrl = ref<string | null>(null)
const iconUrlCropped = ref<string>()

const router = useRouter()

function onClose() {
  router.push('/')
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
  <div class="server-create main-content">
    <header class="server-create-form-header">
      <div class="tile title">Server</div>
      <ButtonClose @click="onClose"></ButtonClose>
    </header>
    <FormServerCreate
      class="form-server-create"
      v-model:title="title"
      v-model:description="description"
      :src="iconUrlCropped"
      @icon-load="onIconLoad"
      @click-create="onClickCreate"
    ></FormServerCreate>
  </div>
  <Teleport v-if="iconUrl" to=".app-overlay">
    <ImageCropper :src="iconUrl" @cancel="iconUrl = null" @crop="onIconCrop"></ImageCropper>
  </Teleport>
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
    color: var(--success-0);
    border-color: var(--success-0);
  }
}

.form-server-create {
  margin-top: var(--gap);
}
</style>
