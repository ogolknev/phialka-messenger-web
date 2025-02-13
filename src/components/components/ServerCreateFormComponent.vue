<script setup lang='ts'>
import PhotoInputElement from '../elements/PhotoInputElement.vue';
import TextInputElement from '../elements/TextInputElement.vue';
import ButtonElement from '../elements/ButtonElement.vue';

const title = defineModel('title', { type: String, required: true })
const description = defineModel('description', { type: String, required: true })
const emit = defineEmits<{
  (ev: 'icon-load', url: string): void
  (ev: 'click-create'): void
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

function onClickCreate() {
  emit('click-create')
}
</script>

<template>
  <div class="server-create-form-component">
    <photo-input-element
      :src="src"
      @change="onPhotoLoad"
      color='success'
    ></photo-input-element>
    <text-input-element
      class="tite-input"
      v-model="title"
      placeholder="Title..."
      color='success'
    ></text-input-element>
    <text-input-element
      class="description-input"
      v-model="description"
      placeholder="Description..."
      color='success'
      maxrows="5"
      rows="5"
      maxlength="200"
    ></text-input-element>
    <div class="buttons-container">
      <button-element color='success' @click="onClickCreate">Create</button-element>
    </div>
  </div>
</template>

<style scoped>
.server-create-form-component {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  gap: var(--gap);
}

.text-input-element {
  width: 100%;
}

.description-input,
.buttons-container {
  grid-column: 1 / 3;
}

.buttons-container {
  display: flex;
  flex-flow: row-reverse;
}
</style>
