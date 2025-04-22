<script setup lang="ts">
import { ref } from 'vue'

const input = ref<HTMLInputElement>()
const { src, color } = defineProps<{ src?: string; color?: 'success' | 'danger' | 'warning' }>()
const emit = defineEmits<{ (e: 'change', event: Event): void }>()

function onChange(event: Event) {
  emit('change', event)
}

function onClick() {
  input.value?.click()
}
</script>

<template>
  <div class="tile input input-photo" :class="color" @click="onClick" tabindex="0">
    <input type="file" ref="input" accept="image/*" @change="onChange" style="display: none" />
    <img v-if="src" :src="src" />
    <svg class="user-photo-template" viewBox="0 0 39 30" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.7225 14.1405C13.232 13.5782 14.1622 13.5782 14.6716 14.1405L16.5479 16.2114C17.0573 16.7737 17.9875 16.7737 18.497 16.2114L22.8853 11.3677C23.4074 10.7915 24.3663 10.8083 24.8647 11.4024L38.2273 27.3314C38.8814 28.1111 38.2849 29.25 37.2225 29.25H1.77756C0.692818 29.25 0.103486 28.0688 0.803003 27.2967L12.7225 14.1405Z"
      />
      <path
        d="M9.87175 4.3125C9.87175 6.28001 8.1591 7.875 6.04643 7.875C3.93376 7.875 2.2211 6.28001 2.2211 4.3125C2.2211 2.34499 3.93376 0.75 6.04643 0.75C8.1591 0.75 9.87175 2.34499 9.87175 4.3125Z"
      />
    </svg>
  </div>
</template>

<style scoped>
.input-photo {
  --accent-photo-input: var(--accent-0);
}

.input-photo.success {
  --accent-photo-input: var(--success-0);
}

.input-photo.warning {
  --accent-photo-input: var(--warning-0);
}

.input-photo.danger {
  --accent-photo-input: var(--danger-0);
}

.input-photo {
  position: relative;
  display: grid;
  place-content: center;
  cursor: pointer;
  transition: border-color var(--anim-fade);
  overflow: hidden;

  svg {
    width: calc(var(--tile-size) * 0.5);
    fill: var(--icon-clr);
    transition: fill var(--anim-fade);
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.input-photo:hover,
.input-photo:focus {
  border-color: var(--accent-photo-input);

  svg {
    fill: var(--accent-photo-input);
  }
}
</style>
