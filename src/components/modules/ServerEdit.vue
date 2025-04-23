<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import FormServerEdit from '@/components/components/FormServerEdit.vue'
import ButtonClose from '../elements/ButtonClose.vue'
import ImageCropper from '@/components/components/ImageCropper.vue'
import { getCanvasBlob } from '@/shared/utils/shared'
import { api } from '@/shared'
import { useStore } from '@/store'

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
  router.push('/')
}

function onIconLoad(url: string) {
  iconUrl.value = url
}

async function onIconCrop(canvas?: HTMLCanvasElement) {
  if (!canvas) return
  iconUrlCropped.value = canvas.toDataURL()
  iconUrl.value = null
  iconBlob.value = await getCanvasBlob(canvas)
}

async function onClickEdit() {
  // await api.servers.editServerServersServerIdPatch(route.params.id as string, {
  //   title: title.value,
  //   description: description.value,
  // })
  await api.servers.editServerServersServerIdPatch({
    serverId: route.params.id as string, serverUpdate: {
      title: title.value, description: description.value
    }
  })
  if (iconBlob.value) {
    await api.servers.setServerLogoServersServerIdLogoPut({ serverId: route.params.id as string, logo: iconBlob.value })
  }
  title.value = ''
  description.value = ''
  router.push('/')
}

async function onClickRemove() {
  await api.servers.deleteServerServersServerIdDelete({ serverId: route.params.id as string })
  title.value = ''
  description.value = ''
  router.push('/')
}

onMounted(() => {
  server.value = store.servers.find((value) => value.serverId === route.params.id)
  title.value = server.value?.title ?? ''
  description.value = server.value?.description ?? ''
  if (server.value?.logo?.downloadId)
    iconUrlCropped.value =
      import.meta.env.VITE_API_BASE_URL + '/files/download/' + server.value?.logo?.downloadId
})
</script>

<template>
  <div class="server-edit main-content">
    <header class="server-edit-form-header">
      <div class="tile title">Server</div>
      <ButtonClose @click="onClose"></ButtonClose>
    </header>
    <FormServerEdit class="form-server-edit" v-model:title="title" v-model:description="description"
      :src="iconUrlCropped" @icon-load="onIconLoad" @click-edit="onClickEdit" @click-remove="onClickRemove">
    </FormServerEdit>
  </div>
  <Teleport v-if="iconUrl" to=".app-overlay">
    <ImageCropper :src="iconUrl" @cancel="iconUrl = null" @crop="onIconCrop"></ImageCropper>
  </Teleport>
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
    color: var(--warning-0);
    border-color: var(--warning-0);
  }
}

.form-server-edit {
  margin-top: var(--gap);
}
</style>
