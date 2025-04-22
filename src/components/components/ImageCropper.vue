<script setup lang="ts">
import ButtonDefault from '../elements/ButtonDefault.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import Cropper from 'cropperjs'

const image = ref<HTMLImageElement>()
let cropper: Cropper | null = null

const { src } = defineProps<{ src?: string }>()
const emit = defineEmits<{
  (e: 'crop', canvas: HTMLCanvasElement): void
  (e: 'cancel'): void
}>()

onMounted(() => {
  addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  removeEventListener('keydown', onKeydown)
})

const onLoad = () => {
  cropper = new Cropper(image.value!, {
    aspectRatio: 1,
    viewMode: 2,
    dragMode: 'move',
    movable: true,
    responsive: true,
    background: false,
    center: false,
    guides: false,
  })
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emit('crop', cropper!.getCroppedCanvas())
  } else if (event.key === 'Escape') {
    emit('cancel')
  }
}

function onSubmit() {
  emit('crop', cropper!.getCroppedCanvas())
}

function onCancel() {
  emit('cancel')
}
</script>

<template>
  <div class="tile image-cropper">
    <div class="crop-container">
      <img v-if="src" ref="image" :src="src" @load="onLoad" />
    </div>
    <div class="button-container">
      <ButtonDefault @click="onCancel" color="danger">Cancel</ButtonDefault>
      <ButtonDefault @click="onSubmit" color="warning">Crop</ButtonDefault>
    </div>
  </div>
</template>

<style scoped>
.image-cropper {
  position: relative;
  width: fit-content;
  height: fit-content;
  padding: var(--gap);

  .crop-container {
    width: 80dvw;
    height: 80dvh;
    overflow: hidden;
  }
}

img {
  display: block;
  width: 100%;
}

.button-container {
  margin-top: var(--gap);
  display: flex;
  justify-content: end;
  gap: var(--gap);
}
</style>

<style>
@import '/node_modules/cropperjs/dist/cropper.min.css';

.cropper-view-box {
  outline: 1px solid var(--white-0);
}

.cropper-line {
  display: none;
}

.cropper-point {
  display: none;
}
</style>
