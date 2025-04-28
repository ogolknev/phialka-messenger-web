<script setup lang='ts'>
import { DefaultButton, TextInput, TextArea, ImageInput } from '@/shared';
import { useChannelCreateFormStore } from '@/features';
import { computed, ref } from 'vue';

const { processChannelPhoto } = defineProps<{ processChannelPhoto?: (image: Blob) => Promise<Blob> }>()
const channelCreateFormStore = useChannelCreateFormStore()
const emit = defineEmits<{ serverCreate: [] }>()
const error = ref('')
const channelPhotoSrc = computed(() => channelCreateFormStore.form.photo ? URL.createObjectURL(channelCreateFormStore.form.photo) : undefined)

async function submitChannelCreate() {
  error.value = (await channelCreateFormStore.submitForm()) || ''
  if (!error.value) {
    emit('serverCreate')
  }
}

async function onFileLoad(file: Blob) {
  channelCreateFormStore.form.photo = processChannelPhoto ? await processChannelPhoto(file) : file
}
</script>

<template>
  <div class="channel-create-widget">
    <form class="channel-create-form" @submit.prevent="submitChannelCreate">
      <ImageInput class="photo-input" :src="channelPhotoSrc" @fileload="onFileLoad"></ImageInput>
      <TextInput v-model="channelCreateFormStore.form.name" class="name-input" placeholder="Name"></TextInput>
      <TextArea v-model="channelCreateFormStore.form.description" class="description-input"
        placeholder="Description"></TextArea>

      <div v-if="error" class="errors">{{ error }}</div>

      <div class="button-container">
        <DefaultButton type='submit'>Save</DefaultButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.channel-create-form {
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
