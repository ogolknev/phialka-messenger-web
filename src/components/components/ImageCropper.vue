<script setup lang="ts">
import ButtonDefault from '../elements/ButtonDefault.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import Cropper, { CropperHandle } from 'cropperjs'

const image = ref<HTMLImageElement>()
let cropper: Cropper | null = null

const { src } = defineProps<{ src?: string }>()
const emit = defineEmits<{
  (e: 'crop', canvas: HTMLCanvasElement | undefined): void
  (e: 'cancel'): void
}>()

onMounted(() => {
  addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  removeEventListener('keydown', onKeydown)
})

const initCropper = () => {
  cropper = new Cropper('.cropper-image')
  const selection = cropper.getCropperSelection()
  if (selection) {
    selection.aspectRatio = 1
    selection.resizable = true
    selection.movable = true
    selection.$center()
  }
  const image = cropper.getCropperImage()
  if (image) {
    image.initialCenterSize = "cover"
    image.skewable = true
    image.translatable = true
  }
  const canvas = cropper.getCropperCanvas()
  if (canvas) {
    canvas.background = false
    canvas.$addStyles(`
      :host {
        min-height: 60dvh;
        min-width: 70dvw;
      }
    `)
  }
  const handle = cropper.container.querySelector<CropperHandle>('cropper-handle')
  if (handle) {
    handle.action = 'move'
  }
}

async function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emit('crop', await cropper!.getCropperSelection()?.$toCanvas({ width: 1080 }))
  } else if (event.key === 'Escape') {
    emit('cancel')
  }
}

async function onSubmit() {
  emit('crop', await cropper!.getCropperSelection()?.$toCanvas({ width: 1080 }))
}

function onCancel() {
  emit('cancel')
}
</script>

<template>
  <div class="tile image-cropper">
    <img v-if="src" class="cropper-image" ref="image" :src="src" @load="initCropper" />
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
/* @import '/node_modules/cropperjs/dist/cropper.min.css';

.cropper-view-box {
  outline: 1px solid var(--white-0);
}

.cropper-line {
  display: none;
}

.cropper-point {
  display: none;
} */
</style>
