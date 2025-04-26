<script setup lang='ts'>
import { ServerCreateWidget } from '@/widgets';
import { useRouter } from 'vue-router';

const router = useRouter()

function onServerCreate() {
  router.back()
}
</script>

<template>
  <div class="server-create-page">
    <div class="modal tile">
      <header>Create Server</header>
      <ServerCreateWidget class="server-create-widget" @server-create="onServerCreate"></ServerCreateWidget>
    </div>
  </div>
</template>

<style scoped>
.server-create-page {
  height: 100%;
  display: grid;
  place-content: center;
}

.modal {
  padding: var(--gap-size-m);
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
}

header {
  font-size: var(--font-size-m);
}
</style>
