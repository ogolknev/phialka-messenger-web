<script setup lang="ts">
import { DefaultButton, TextInput, TextArea, ImageInput } from '@/shared'
import { useServerCreateFormStore } from '@/features'
import { computed, ref } from 'vue'

const { processServerPhoto } = defineProps<{
  processServerPhoto?: (image: Blob) => Promise<Blob>
}>()
const serverCreateFormStore = useServerCreateFormStore()
const emit = defineEmits<{ serverCreate: [] }>()
const error = ref('')
const serverPhotoSrc = computed(() =>
  serverCreateFormStore.form.photo
    ? URL.createObjectURL(serverCreateFormStore.form.photo)
    : undefined,
)

async function submitServerCreate() {
  error.value = (await serverCreateFormStore.submitForm()) || ''
  if (!error.value) {
    emit('serverCreate')
  }
}

async function onFileLoad(file: Blob) {
  serverCreateFormStore.form.photo = processServerPhoto ? await processServerPhoto(file) : file
}
</script>

<template>
  <div class="server-create-widget">
    <form class="server-create-form" @submit.prevent="submitServerCreate">
      <ImageInput class="photo-input" :src="serverPhotoSrc" @fileload="onFileLoad"></ImageInput>
      <TextInput
        v-model="serverCreateFormStore.form.name"
        class="name-input"
        placeholder="Name"
      ></TextInput>
      <TextArea
        v-model="serverCreateFormStore.form.description"
        class="description-input"
        placeholder="Description"
      ></TextArea>

      <div v-if="error" class="errors">
        {{ error }}
      </div>

      <div class="button-container">
        <DefaultButton type="submit">Save</DefaultButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.server-create-form {
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
