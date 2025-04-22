<script setup lang="ts">
import { ref, watch } from 'vue'
import { stringToDateString } from '@/utils/shared'

const {
  modelValue,
  color,
  invalid = false,
} = defineProps<{
  modelValue: string
  color?: 'success' | 'warning' | 'danger'
  invalid?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const value = ref('')

const onInput = (event: Event) => {
  value.value = stringToDateString((event.target as HTMLInputElement).value)
  emit('update:modelValue', value.value)
}

watch(
  () => modelValue,
  (val) => {
    value.value = stringToDateString(val)
  },
)
</script>

<template>
  <input
    v-model="value"
    class="input-data tile input"
    :class="[color, { invalid }]"
    type="text"
    @input="onInput"
  />
</template>

<style scoped>
.input-data {
  --accent-input: var(--accent-0);
}

.input-data.success {
  --accent-input: var(--success-0);
}

.input-data.warning {
  --accent-input: var(--warning-0);
}

.input-data.danger,
.input-data.invalid {
  --accent-input: var(--danger-0);
}

.input-data:focus {
  border-color: var(--accent-input);
  caret-color: var(--accent-input);
}
</style>
