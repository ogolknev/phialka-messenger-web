<script setup lang="ts">
import ButtonElement from '../elements/ButtonDefault.vue';


const emit = defineEmits(['sign-out', 'edit'])

const { profileName } = defineProps<{ tabindex: 0 | -1, profileName?: string }>()

function onSignOut() {
  emit('sign-out')
}

function onEdit() {
  emit('edit')
}
</script>

<template>
  <div class="tile menu-profile-mini">
    <span class="name">{{ profileName }}</span>
    <div class="button-container">
      <button-element color="danger" @click="onSignOut" @keydown.enter="onSignOut" :tabindex="tabindex">Sign Out</button-element>
      <button-element color="warning" @click="onEdit" :tabindex="tabindex">Edit</button-element>
    </div>
  </div>
</template>

<style scoped>
.menu-profile-mini {
  padding: var(--gap);
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.menu-profile-mini.active {
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
