<script setup lang="ts">
import TileElement from '@/elements/TileElement.vue';
import ButtonElement from '@/elements/ButtonElement.vue';
import { useProfileStore } from '@/store/profile';
import { useAuthStore } from '@/store/auth';

const profileStore = useProfileStore()
const authStore = useAuthStore()

const { active = false } = defineProps<{ active?: boolean }>()
</script>

<template>
  <tile-element class="profile-side-menu" :class="{ active: active }">
    <span class="name">{{ profileStore.profile?.name }}</span>
    <div class="button-container">
      <button-element class="danger" @click="authStore.signOut" @keydown.enter="authStore.signOut" :tabindex="active ? 0 : -1">Sign Out</button-element>
      <button-element class="warning" :tabindex="active ? 0 : -1">Edit</button-element>
    </div>
  </tile-element>
</template>

<style scoped>
.profile-side-menu {
  position: absolute;
  top: calc(2 * var(--gap) + var(--tile-size));
  right: var(--gap);
  padding: var(--gap);
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  transform: translateX(calc(100% + var(--gap)));
  transition: transform 200ms ease-out;
}

.profile-side-menu.active {
  transform: none;
}

.name {
  font-size: var(--text-m);
}

.button-container {
  display: flex;
  gap: var(--gap);
  justify-content: space-between;
}
</style>
