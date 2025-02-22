<script setup lang='ts'>
import InputPhoto from '../elements/InputPhoto.vue';
import InputText from '../elements/InputText.vue';
import InputTextarea from '../elements/InputTextarea.vue';
import ButtonDefault from '../elements/ButtonDefault.vue';


const title = defineModel('title', { type: String, required: true })
const description = defineModel('description', { type: String, required: true })
const emit = defineEmits<{
  (ev: 'icon-load', url: string): void
  (ev: 'click-edit'): void
  (ev: 'click-remove'): void
}>()
const { src } = defineProps<{ src?: string }>()

function onPhotoLoad(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      emit('icon-load', event.target?.result as string)
    }
    reader.readAsDataURL(file)
  }
}

function onClickEdit() {
  emit('click-edit')
}

function onClickRemove() {
  emit('click-remove')
}
</script>

<template>
  <div class="form-server-edit">
    <InputPhoto class="input-photo" :src="src" @change="onPhotoLoad" color='warning'></InputPhoto>
    <InputText class="input-text title-input" v-model="title" placeholder="Title..." color='warning'></InputText>
    <InputTextarea class="input-text description-input" v-model="description" placeholder="Description..." color='warning'
      max-rows="5" rows="5" maxlength="200"></InputTextarea>
    <div class="buttons-container">
      <ButtonDefault color='warning' @click.prevent="onClickEdit">Edit</ButtonDefault>
      <ButtonDefault color='danger' @click.prevent="onClickRemove">Remove</ButtonDefault>
    </div>
  </div>
</template>

<style scoped>
.form-server-edit {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  gap: var(--gap);
}

.input-text {
  width: 100%;
}

.description-input,
.buttons-container {
  grid-column: 1 / 3;
}

.buttons-container {
  display: flex;
  flex-flow: row-reverse;
  gap: var(--gap);
}
</style>
