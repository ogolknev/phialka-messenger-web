<script setup lang="ts">
import { DefaultButton } from '@/shared'
import Cropper from 'cropperjs'
import { onMounted } from 'vue'

const { src, aspectRatio = 1 } = defineProps<{ src: string; aspectRatio?: number }>()
const emit = defineEmits<{ crop: [image: Blob] }>()

let cropper: Cropper

async function onCrop() {
  const image = cropper.getCropperImage()
  const selection = cropper.getCropperSelection()

  if (!image) throw new Error("Cropper hasn't image")
  if (!selection) throw new Error("Cropper hasn't selection")

  const selectionCanvas = await selection.$toCanvas({
    width: (selection.width / image.$image.width) * image.$image.naturalWidth,
    height: (selection.height / image.$image.height) * image.$image.naturalHeight,
  })
  selectionCanvas?.toBlob((image) => {
    if (image) emit('crop', image)
  })
}

async function configureCropper(cropper: Cropper) {
  const canvas = cropper.getCropperCanvas()
  const image = cropper.getCropperImage()
  const selection = cropper.getCropperSelection()

  if (!canvas) throw new Error("Can't get cropper-canvas")
  if (!image) throw new Error("Can't get cropper-image")
  if (!selection) throw new Error("Can't get cropper-selection")

  canvas.background = false
  // const canvasElement = await canvas.$toCanvas()
  canvas.classList.add('cropper-canvas')
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  // canvas.$setAction('move')

  image.initialCenterSize = 'contain'
  image.rotatable = true
  image.scalable = true
  image.$center()

  selection.aspectRatio = aspectRatio
  selection.movable = true
  selection.resizable = true
}

onMounted(() => {
  cropper = new Cropper('#cropper-image')
  configureCropper(cropper)
})
</script>

<template>
  <div class="crop-image-widget tile modal">
    <img id="cropper-image" :src="src" />
    <div class="button-container">
      <DefaultButton @click="onCrop">Save</DefaultButton>
    </div>
  </div>
</template>

<style scoped>
.crop-image-widget {
  padding: var(--gap-size-m);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-m);
}
</style>

<style>
.cropper-canvas {
  height: 100%;
  width: 100%;
}
</style>
