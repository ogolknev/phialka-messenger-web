<template>
  <div class="flex flex-col gap-2">
    <div class="card size-full overflow-hidden [&_cropper-canvas]:size-full">
      <cropper-canvas ref="canvas">
        <cropper-image
          ref="image"
          :src
          alt="Picture"
          rotatable
          scalable
          skewable
          translatable></cropper-image>
        <cropper-shade hidden></cropper-shade>
        <cropper-handle action="move" plain></cropper-handle>
        <cropper-selection
          ref="selection"
          initial-coverage="0.5"
          movable
          resizable
          :aspect-ratio="1 / 1">
          <cropper-grid role="grid" covered></cropper-grid>
          <cropper-crosshair centered></cropper-crosshair>
          <cropper-handle
            action="move"
            theme-color="transparent"></cropper-handle>
          <cropper-handle
            action="n-resize"
            theme-color="var(--color-primary-500)"></cropper-handle>
          <cropper-handle
            action="e-resize"
            theme-color="var(--color-primary-500)"></cropper-handle>
          <cropper-handle
            action="s-resize"
            theme-color="var(--color-primary-500)"></cropper-handle>
          <cropper-handle
            action="w-resize"
            theme-color="var(--color-primary-500)"></cropper-handle>
          <cropper-handle
            action="ne-resize"
            theme-color="var(--color-primary-500)"></cropper-handle>
          <cropper-handle
            action="nw-resize"
            theme-color="var(--color-primary-500)"></cropper-handle>
          <cropper-handle
            action="se-resize"
            theme-color="var(--color-primary-500)"></cropper-handle>
          <cropper-handle
            action="sw-resize"
            theme-color="var(--color-primary-500)"></cropper-handle>
        </cropper-selection>
      </cropper-canvas>
    </div>
    <div class="flex justify-end">
      <UIButton icon="lucide:crop" color="primary" @click="crop">Crop</UIButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CropperCanvas,
  CropperImage,
  CropperHandle,
  CropperSelection,
  CropperGrid,
  CropperShade,
  CropperCrosshair,
} from "cropperjs"
import "cropperjs"
import { UIButton } from "../../button"
import { useTemplateRef } from "vue"

const { src } = defineProps<{ src: string }>()
const emit = defineEmits<{ crop: [blob: Blob] }>()

const selectionRef = useTemplateRef("selection")

async function crop() {
  const canvas = await selectionRef.value?.$toCanvas()
  if (!canvas) return

  canvas.toBlob((blob) => {
    if (blob) emit("crop", blob)
  })
}
</script>
