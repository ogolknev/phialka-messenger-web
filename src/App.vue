<script setup lang="ts">
import { ref, watch } from 'vue';
import MainHeaderComponent from './components/MainHeaderComponent.vue';
import ToastElement from './elements/ToastElement.vue';
import { useAppStore } from './store/app';

const appStore = useAppStore()
const currentToast = ref<string | null>()

async function showToasts(toasts: string[]) {
  if (currentToast.value) return
  for (const toast of toasts) {
    await new Promise<void>((resolve) => setTimeout(resolve, 1))
    currentToast.value = toast
    await new Promise<void>((resolve) => setTimeout(() => {
      currentToast.value = null
      toasts.shift()
      resolve()
    }, 4000))
  }
}

watch(appStore.toasts, () => showToasts(appStore.toasts), { flush: 'sync' })
</script>

<template>
  <main-header-component></main-header-component>
  <main>
    <router-view></router-view>
  </main>
  <div class="overlay">
    <div class="spacer"></div>
    <div class="toast-container">
      <toast-element v-if="currentToast">{{ currentToast }}</toast-element>
    </div>
  </div>
</template>

<style>
#app {
  box-sizing: border-box;
  padding: var(--gap);
  display: grid;
  grid-template-rows: var(--tile-size) 1fr;
  gap: var(--gap);
}
</style>

<style scoped>
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
  display: grid;
  grid-template-rows: 1fr auto;
  justify-items: center;
}

.toast-container {
  width: 100%;
  height: 10rem;
  display: grid;
  place-content: center;
  overflow: hidden;
}

.toast-element {
  transform: translateY(calc(100% + 5rem));
  animation: toast-show 4s ease-in-out forwards;
}

@keyframes toast-show {
  0% {
    transform: translateY(calc(100% + 5rem));
  }
  10% {
    transform: none;
  }
  90% {
    transform: none;
  }
  100% {
    transform: translateY(calc(100% + 5rem));
  }
}
</style>
