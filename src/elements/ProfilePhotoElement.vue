<script setup>
import TileElement from './TileElement.vue';
</script>

<template>
  <tile-element class="profile-photo-element">
    <div class="thumbnail">
      <img
        src="https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
        alt="Profile photo"
      >
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
  border-color: var(--accent-0);
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
