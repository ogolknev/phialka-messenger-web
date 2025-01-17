<script setup lang="ts">
import { ref } from 'vue';
import TileElement from './TileElement.vue';

const model = defineModel({ type: String })
const emit = defineEmits(['input'])
const textarea = ref<HTMLTextAreaElement>()

const { placeholder, rows = 1, maxrows = 1, maxlength = 20, password = false, spellcheck = false } = defineProps<{
  placeholder?: string,
  rows?: number | string,
  maxrows?: number | string,
  maxlength?: number | string,
  password?: boolean,
  autocomplete?: string,
  spellcheck?: boolean | 'true' | 'false'
}>()

function textareaResize() {
  if (textarea.value) {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = textarea.value.scrollHeight + 'px'
  }
}

</script>

<template>
  <tile-element class="text-input-element">
    <textarea v-if="!password" ref="textarea" :autocomplete="autocomplete" v-model="model" :rows="rows"
      :maxlength="maxlength" :placeholder="placeholder" :spellcheck="spellcheck"
      @input="() => { textareaResize(); emit('input') }"></textarea>
    <input v-else type="password" :autocomplete="autocomplete" v-model="model" :maxlength="maxlength"
      :placeholder="placeholder" :spellcheck="spellcheck" @input="emit('input')">
  </tile-element>
</template>

<style scoped>
.text-input-element {
  --accent-input: var(--accent)
}

.text-input-element.success {
  --accent-input: var(--success)
}

.text-input-element.warning {
  --accent-input: var(--warning)
}

.text-input-element.danger {
  --accent-input: var(--danger)
}

.text-input-element {

  --line-height: 1.5;
  --max-rows: v-bind("maxrows");

  display: grid;
  place-items: center;
  height: fit-content;
  min-height: var(--tile-size);
  min-width: 10rem;
  padding: var(--gap);
}

.text-input-element:has(textarea:focus):not(.invalid),
.text-input-element:has(input:focus):not(.invalid) {
  border-color: var(--accent-input);
  caret-color: var(--accent-input);
}

.text-input-element.invalid {
  border-color: var(--danger);
  caret-color: var(--danger);

  textarea,
  input {
    color: var(--danger);
  }
}

textarea {
  width: 100%;
  max-height: calc(var(--text-m) * var(--line-height) * var(--max-rows));
  line-height: var(--line-height);
  resize: none;
  overflow-y: auto;
  color: var(--text);
  background-color: transparent;
  font-family: inherit;
  font-weight: inherit;
  font-size: var(--text-m);
}

input {
  width: 100%;
  line-height: var(--line-height);
  color: var(--text);
  background-color: transparent;
  font-family: inherit;
  font-weight: inherit;
  font-size: var(--text-m);
}

textarea::placeholder,
input::placeholder {
  color: var(--text-dark-0);
}
</style>
