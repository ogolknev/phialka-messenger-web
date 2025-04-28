<script setup lang="ts">
import { HTTPError } from '@/shared'
import { useProfileStore } from '@/entities/profile'
import { MainHeaderWidget } from '@/widgets'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import './style/main.css'

const router = useRouter()
const profileStore = useProfileStore()

async function checkAuth() {
  try {
    await profileStore.updateProfile()
  } catch (error) {
    if (error instanceof HTTPError) handleHttpError(error)
  }
}

function handleHttpError(error: HTTPError) {
  if (error.status === 403) router.push({ name: 'auth' })
}

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div class="app">
    <header>
      <MainHeaderWidget></MainHeaderWidget>
    </header>
    <main>
      <RouterView></RouterView>
    </main>
    <div id="overlay"></div>
  </div>
</template>

<style scoped>
.app {
  height: 100dvh;
  padding: var(--gap-size-s);
  display: grid;
  grid-template-rows: 5rem 1fr;
  gap: var(--gap-size-s);
}

main {
  height: 100%;
  overflow: hidden;
}

#overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
}

#overlay:has(.touchable) {
  pointer-events: all;
}
</style>
