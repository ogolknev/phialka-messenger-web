<script setup lang="ts">
import { HTTPError } from '@/shared'
import './style/main.css'
import { useProfileStore } from '@/entities/profile'
import { MainHeaderWidget } from '@/widgets'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
</style>
