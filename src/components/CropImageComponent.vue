<script setup lang='ts'>
import ButtonElement from '@/elements/ButtonElement.vue';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import Cropper from 'cropperjs'
import '../style/cropper.css'

const image = ref<HTMLImageElement>()
let cropper: Cropper | null = null

const { src } = defineProps<{ src?: string }>()
const emit = defineEmits<{
  (e: 'crop', canvas: HTMLCanvasElement): void
  (e: 'cancel'): void
}>()

onMounted(() => {
  nextTick(() => {
    cropper = new Cropper(image.value!, {
      aspectRatio: 1,
      viewMode: 2,
      dragMode: 'move',
      responsive: true
    })
  })
  addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  removeEventListener('keydown', onKeydown)
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emit('crop', cropper!.getCroppedCanvas())
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
  <div class="tile crop-image-component">
    <div class="crop-container">
      <img
        v-if="src"
        ref="image"
        :src="src"
      >
    </div>
    <div class="button-container">
      <button-element
        @click="onCancel"
        type="danger"
      >Cancel</button-element>
      <button-element
        @click="onSubmit"
        type="warning"
      >Crop</button-element>
    </div>
  </div>
</template>

<style scoped>
.crop-image-component {
  max-width: 80vw;

  .crop-container {
    width: 100%;
    height: 100%;
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
