<script setup lang='ts'>
import CloseButtonElement from '@/elements/CloseButtonElement.vue';
import ProfileEditFormComponent from '@/components/ProfileEditFormComponent.vue';
import CropImageComponent from '@/components/CropImageComponent.vue';
import { computed, ref } from 'vue';
import { useProfileStore } from '@/store/profile';
import { formatDate, getCanvasBlob } from '@/composables/shared';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';


const router = useRouter()
const appStore = useAppStore()
const profileStore = useProfileStore()
const newProfilePhotoCroppedCanvas = ref<HTMLCanvasElement>()
const newProfilePhotoURL = ref<string>()
const newProfilePhotoURLCropped = ref<string>()
const newProfileForm = ref<{
  name: string,
  tag: string,
  birthdate: string,
  description: string
}>({
  name: '',
  tag: '',
  birthdate: '',
  description: ''
})

if (profileStore.profile) {
  newProfileForm.value.name = profileStore.profile.name ?? ''
  newProfileForm.value.tag = profileStore.profile.tag ?? ''
  newProfileForm.value.birthdate = formatDate(profileStore.profile.birthdate, 'yyyy-mm-dd', 'dd.mm.yyyy') ?? ''
  newProfileForm.value.description = profileStore.profile.description ?? ''
}

const profilePhoto = computed(() => {
  if (newProfilePhotoURLCropped.value) return newProfilePhotoURLCropped.value
  if (profileStore.profile?.photo) return import.meta.env.VITE_API_BASE_URL + '/files/download/' + profileStore.profile?.photo.download_id
  return undefined
})

function onNewProfilePhotoLoad(url: string) {
  console.log('load')
  console.log(url)
  newProfilePhotoURL.value = url
  addEventListener('keydown', onKeydown)
}

function onNewProfilePhotoCrop(canvas: HTMLCanvasElement) {
  newProfilePhotoURLCropped.value = canvas.toDataURL()
  newProfilePhotoURL.value = undefined
  newProfilePhotoCroppedCanvas.value = canvas
}

function clearNewProfilePhotoUrl() {
  newProfilePhotoURL.value = undefined
  removeEventListener('keydown', onKeydown)
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    clearNewProfilePhotoUrl()
  }
}

async function onSubmit() {
  console.log(JSON.stringify(newProfileForm.value))
  await profileStore.editProfile({ ...newProfileForm.value, ...{ birthdate: formatDate(newProfileForm.value.birthdate ?? '') ?? undefined } })
  if (newProfilePhotoCroppedCanvas.value) {
    const blob = await getCanvasBlob(newProfilePhotoCroppedCanvas.value)
    const formData = new FormData()
    formData.append('photo', blob, 'profile-photo.jpg')
    await profileStore.setProfilePhoto(formData)
  }
  await profileStore.getProfile()
}

function onRemove() {
  appStore.toasts.push("It's not working yet (0_o)")
}

function onClose() {
  router.push("/")
}

</script>

<template>
  <div class="profile-edit-view">
    <header>
      <div class="tile title">Profile</div>
      <close-button-element @click="onClose"></close-button-element>
    </header>
    <profile-edit-form-component
      v-model:name="newProfileForm.name"
      v-model:tag="newProfileForm.tag"
      v-model:birthdate="newProfileForm.birthdate"
      v-model:description="newProfileForm.description"
      :image-url="profilePhoto"
      @photo-load="onNewProfilePhotoLoad"
      @submit="onSubmit"
      @remove="onRemove"
    ></profile-edit-form-component>
    <teleport to=".app-overlay-module">
      <crop-image-component
        v-if="newProfilePhotoURL"
        :src="newProfilePhotoURL"
        @crop="onNewProfilePhotoCrop"
      ></crop-image-component>
    </teleport>
  </div>
</template>

<style scoped>
.profile-edit-view {
  position: relative;
  margin-inline: auto;
  width: var(--main-content-width);
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap);
}

header {
  display: flex;
  flex-flow: row nowrap;
  gap: var(--gap);

  .title {
    width: fit-content;
    flex-grow: 1;
    min-height: var(--tile-size);
    height: fit-content;
    padding-inline: var(--gap);
    font-size: var(--text-m);
    display: grid;
    place-content: center;
    border-color: var(--warning);
    color: var(--warning);
  }
}

.profile-edit-form-component {
  width: 100%;
}

.crop-image-component {
  width: var(--modal-width);
  height: fit-content;
  padding: var(--gap);
}
</style>
