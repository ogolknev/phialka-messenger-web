<script setup lang='ts'>
import { DefaultButton, TextInput, TextArea } from '@/shared';
import { useServerCreateFormStore } from '@/features';
import { ref } from 'vue';

const serverCreateStore = useServerCreateFormStore()
const emit = defineEmits<{ serverCreate: [] }>()
const error = ref('')

async function submitServerCreate() {
  error.value = (await serverCreateStore.submitForm()) || ''
  if (!error.value) {
    emit('serverCreate')
  }
}
</script>

<template>
  <div class="server-create-widget">
    <form class="server-create-form" @submit.prevent="submitServerCreate">
      <TextInput v-model="serverCreateStore.form.name" class="name-input" placeholder="Name"></TextInput>
      <TextArea v-model="serverCreateStore.form.description" class="description-input"
        placeholder="Description"></TextArea>

      <div v-if="error" class="errors">{{ error }}</div>

      <div class="button-container">
        <DefaultButton type='submit'>Save</DefaultButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.server-create-form {
  min-height: fit-content;
  display: flex;
  flex-flow: column nowrap;
  gap: var(--gap-size-s);
}

.errors {
  color: var(--clr-danger);
}
</style>
