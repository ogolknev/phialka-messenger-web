<script setup lang='ts'>
import { DefaultButton, TextInput, TextArea, ImageInput } from '@/shared';
import { useServerEditFormStore } from '@/features';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useServersStore } from '@/entities';

const { processServerPhoto } = defineProps<{ processServerPhoto?: (image: Blob) => Promise<Blob> }>()
const serverEditFormStore = useServerEditFormStore()
const serversStore = useServersStore()
const emit = defineEmits<{ serverEdit: [] }>()
const error = ref('')
const serverPhotoSrc = computed(() => serverEditFormStore.form.photo ? URL.createObjectURL(serverEditFormStore.form.photo) : undefined)
const route = useRoute()

async function submitServerEdit() {
  error.value = (await serverEditFormStore.submitForm()) || ''
  if (!error.value) {
    emit('serverEdit')
  }
}

async function onFileLoad(file: Blob) {
  serverEditFormStore.form.photo = processServerPhoto ? await processServerPhoto(file) : file
}

onMounted(async () => {
  serverEditFormStore.form.serverId = route.params.id as string
  const server = serversStore.getServerById(route.params.id as string)
  serverEditFormStore.form.name = server?.name ?? ''
  serverEditFormStore.form.description = server?.description ?? ''
  serverEditFormStore.form.photo = server?.photo?.url ? await (await fetch(server.photo.url)).blob() : null
})
</script>

<template>
  <div class="server-edit-widget">
    <form class="server-edit-form" @submit.prevent="submitServerEdit">
      <ImageInput class="photo-input" :src="serverPhotoSrc" @fileload="onFileLoad"></ImageInput>
      <TextInput v-model="serverEditFormStore.form.name" class="name-input" placeholder="Name"></TextInput>
      <TextArea v-model="serverEditFormStore.form.description" class="description-input"
        placeholder="Description"></TextArea>

      <div v-if="error" class="errors">{{ error }}</div>

      <div class="button-container">
        <DefaultButton type='submit'>Save</DefaultButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.server-edit-form {
  min-height: fit-content;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
}

.errors {
  color: var(--clr-danger);
}

.photo-input {
  width: 5rem;
  aspect-ratio: 1;
}
</style>
