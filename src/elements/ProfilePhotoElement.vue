<script setup lang="ts">
import { useProfileStore } from '@/store/profile';
import TileElement from './TileElement.vue';

const profileStore = useProfileStore()
const baseAPIUrl = import.meta.env.VITE_API_BASE_URL
</script>

<template>
  <tile-element class="profile-photo-element">
    <div class="thumbnail">
      <img v-if="profileStore.profile?.photo" :src="baseAPIUrl + 'files/download/' + profileStore.profile?.photo.download_id">
      <img v-else src="../assets/user.svg">
    </div>
  </tile-element>
</template>

<style scoped>
.profile-photo-element {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 200ms ease-out;
  cursor: pointer;
  user-select: none;
}

.profile-photo-element:hover {
  border-color: var(--accent);
}

.thumbnail {
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
  }
}
</style>
