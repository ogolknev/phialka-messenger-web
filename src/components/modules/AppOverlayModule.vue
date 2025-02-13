<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue';
import ToastElement from '../elements/ToastElement.vue';
import { useStore } from '@/store';

const store = useStore()
const currentToast = ref<string | null>()
const currentToastState = ref<'show' | 'hide' | ''>('show')
let animationAppearDuration = 0
const toastDuration = 2000

async function showToasts(toasts: string[]) {
  if (currentToast.value) return
  for (const toast of toasts) {
    await new Promise<void>((resolve) => setTimeout(resolve, 1))
    currentToastState.value = 'show'
    currentToast.value = toast
    await new Promise<void>((resolve) => setTimeout(() => {
      currentToastState.value = ''
      resolve()
    }, animationAppearDuration))
    await new Promise<void>((resolve) => setTimeout(() => {
      currentToastState.value = 'hide'
      resolve()
    }, toastDuration))
    await new Promise<void>((resolve) => setTimeout(() => {
      currentToast.value = null
      toasts.shift()
      resolve()
    }, animationAppearDuration))
  }
}

onMounted(() => {
  animationAppearDuration = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-appear-from-side-duration'), 10)
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape') store.toasts.push('AAAA')
  })
})

watch(store.toasts, () => showToasts(store.toasts), { flush: 'sync' })
</script>

<template>
  <div class="app-overlay-module">
    <div class="toast-area">
      <toast-element v-if="currentToast" :class="currentToastState">{{ currentToast }}</toast-element>
    </div>
  </div>
</template>

<style scoped>
.app-overlay-module {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
  display: grid;
  place-content: center;
}

.app-overlay-module * {
  pointer-events: auto;
}

.toast-area {
  position: absolute;
  height: var(--toast-area-height);
  width: 100%;
  bottom: 0;
  pointer-events: none;
  display: grid;
  place-content: center;
  overflow: hidden;
}

.toast-element {
  transform: none;
}

.toast-element.show {
  animation: toast-show var(--animation-appear-from-side-duration) var(--animation-appear-from-side-function) forwards;
}

.toast-element.hide {
  animation: toast-hide var(--animation-appear-from-side-duration) var(--animation-appear-from-side-function) forwards;
}

@keyframes toast-show {
  0% {
    transform: translateY(calc(100% + var(--toast-area-height) / 2));
  }
  100% {
    transform: none;
  }
}

@keyframes toast-hide {
  0% {
    transform: none;
  }
  100% {
    transform: translateY(calc(100% + var(--toast-area-height) / 2));
  }
}
</style>
