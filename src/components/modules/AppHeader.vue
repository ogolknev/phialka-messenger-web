<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import ButtonBurger from '../elements/ButtonBurger.vue';
import ButtonSignIn from '../elements/ButtonSignIn.vue';
import ThumbnailDefault from '../elements/ThumbnailDefault.vue';

import MenuMain from '@/components/components/MenuMain.vue';
import MenuProfileMini from '@/components/components/MenuProfileMini.vue';
import { useStore } from '@/store';
import api from '@/api';


const router = useRouter()
const store = useStore()

const isSideMenuActive = ref(false)
const isProfileSideMenuActive = ref(false)
const profilePhoto = computed(() => {
  const download_id = store.profile?.photo?.download_id
  if (download_id) {
    return "/api/files/download/" + download_id
  }
  return "/src/assets/user.svg"
})

const sideMenuToogle = () => isSideMenuActive.value = !isSideMenuActive.value
const profileSideMenuToogle = () => isProfileSideMenuActive.value = !isProfileSideMenuActive.value

const toProfileEdit = () => {
  router.push('/profile/edit')
  isProfileSideMenuActive.value = false
}
const signOut = () => {
  api.auth.signOut()
  store.profile = null
  isProfileSideMenuActive.value = false
  router.push('/auth')
}
</script>

<template>
  <header class="app-header">
    <ButtonBurger @click="sideMenuToogle" :active="isSideMenuActive"></ButtonBurger>
    <MenuMain class="menu-main" :class="{ active: isSideMenuActive }"></MenuMain>
    <div class="tile title" @click="router.push('/')">Phialka</div>
    <div class="tile header-spacer"></div>
    <div v-if="store.profile !== null" class="tile profile-photo" @click="profileSideMenuToogle">
      <ThumbnailDefault :src="profilePhoto"></ThumbnailDefault>
    </div>
    <ButtonSignIn v-else @click="router.push('/auth')"></ButtonSignIn>
    <MenuProfileMini class="menu-profile-mini" @edit="toProfileEdit" @sign-out="signOut" :profile-name="store.profile?.name"
      :class="{ active: isProfileSideMenuActive && store.profile !== null }"
      :tabindex="isProfileSideMenuActive && store.profile !== null ? 0 : -1"></MenuProfileMini>
  </header>
</template>

<style scoped>
.app-header {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: var(--gap);
  z-index: 99;
}

.header-spacer {
  width: 100%;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--gap);
  width: fit-content;
  color: var(--accent-0);
  border-color: var(--accent-0);
  font-size: var(--text-xl);
  cursor: pointer;
  user-select: none;
}

.menu-main {
  position: absolute;
  top: calc(2 * var(--gap) + var(--tile-size));
  padding: var(--gap);
  max-width: 30rem;
  width: calc(100% - (2 * var(--gap)));
  height: calc(100% - (3 * var(--gap) + var(--tile-size)));
  transform: translateX(calc(-100% - var(--gap)));
  transition: transform var(--anim-side);
}

.menu-main.active {
  transform: none;
}

.profile-photo {
  cursor: pointer;
  transition: border-color var(--anim-fade);

  &:hover {
    border-color: var(--accent-0);
  }
}

.menu-profile-mini {
  position: fixed;
  top: calc(2 * var(--gap) + var(--tile-size));
  right: var(--gap);
  transform: translateX(calc(100% + var(--gap)));
  transition: transform var(--anim-side);
}

.menu-profile-mini.active {
  transform: none;
}
</style>
