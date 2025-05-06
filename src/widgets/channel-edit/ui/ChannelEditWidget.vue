<script setup lang="ts">
import { DefaultButton, TextInput, TextArea, ImageInput } from '@/shared'
import { useChannelEditFormStore } from '@/features'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useChannelStore } from '@/entities'

const { processChannelPhoto } = defineProps<{
  processChannelPhoto?: (image: Blob) => Promise<Blob>
}>()
const channelEditFormStore = useChannelEditFormStore()
const channelStore = useChannelStore()
const emit = defineEmits<{ channelEdit: [] }>()
const error = ref('')
const channelPhotoSrc = computed(() =>
  channelEditFormStore.form.photo
    ? URL.createObjectURL(channelEditFormStore.form.photo)
    : undefined,
)
const route = useRoute()

async function submitChannelEdit() {
  error.value = (await channelEditFormStore.submitForm()) || ''
  if (!error.value) {
    emit('channelEdit')
  }
}

async function onFileLoad(file: Blob) {
  channelEditFormStore.form.photo = processChannelPhoto ? await processChannelPhoto(file) : file
}

onMounted(async () => {
  channelEditFormStore.form.channelId = route.params.id as string
  const channel = channelStore.getChannelById(route.params.id as string)
  channelEditFormStore.form.name = channel?.name ?? ''
  channelEditFormStore.form.description = channel?.description ?? ''
  channelEditFormStore.form.photo = channel?.photo?.url
    ? await (await fetch(channel.photo.url)).blob()
    : null
})
</script>

<template>
  <div class="channel-edit-widget">
    <form class="channel-edit-form" @submit.prevent="submitChannelEdit">
      <ImageInput class="photo-input" :src="channelPhotoSrc" @fileload="onFileLoad"></ImageInput>
      <TextInput
        v-model="channelEditFormStore.form.name"
        class="name-input"
        placeholder="Name"
      ></TextInput>
      <TextArea
        v-model="channelEditFormStore.form.description"
        class="description-input"
        placeholder="Description"
      ></TextArea>

      <div v-if="error" class="errors">{{ error }}</div>

      <div class="button-container">
        <DefaultButton type="submit">Save</DefaultButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.channel-edit-form {
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
