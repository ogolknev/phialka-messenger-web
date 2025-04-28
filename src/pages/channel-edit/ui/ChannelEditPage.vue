<script setup lang='ts'>
import { ChannelEditWidget, CropImageWidget } from '@/widgets';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const channelPhotoSrc = ref('')
let resolveProcessChannelrPhoto: (value: Blob) => void


function onChannelEdit() {
  router.back()
}

function processChannelPhoto(photo: Blob): Promise<Blob> {
  return new Promise((resolve) => {
    resolveProcessChannelrPhoto = resolve
    channelPhotoSrc.value = URL.createObjectURL(photo)
  })
}

function onCrop(croppedPhoto: Blob) {
  resolveProcessChannelrPhoto(croppedPhoto)
  channelPhotoSrc.value = ''
}

</script>

<template>
  <div class="channel-edit-page">
    <div class="form-container tile">
      <header>Create Channel</header>
      <ChannelEditWidget class="channel-edit-widget" @channel-edit="onChannelEdit"
        :process-channel-photo="processChannelPhoto"></ChannelEditWidget>
    </div>

    <Teleport v-if="channelPhotoSrc" to="#overlay">
      <CropImageWidget class="touchable" :src="channelPhotoSrc" @crop="onCrop"></CropImageWidget>
    </Teleport>
  </div>
</template>

<style scoped>
.channel-edit-page {
  height: 100%;
  display: grid;
  place-content: center;
}

.form-container {
  padding: var(--gap-size-m);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
}

header {
  font-size: var(--font-size-m);
}

.crop-image-widget {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  aspect-ratio: 1;
  width: 30rem;
  max-width: 70dvh;
  max-height: 70dvh;
}
</style>
