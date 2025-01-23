<script setup lang='ts'>
import TextInputElement from '@/elements/TextInputElement.vue';
import ButtonElement from '@/elements/ButtonElement.vue';
import { useValidation } from '@/composables/validation';
import { onMounted, onUnmounted } from 'vue';
import { useAppStore } from '@/store/app';


const name = defineModel<string>('name', { required: true })
const username = defineModel<string>('username', { required: true })
const password = defineModel<string>('password', { required: true })
const emit = defineEmits(['sign-up'])

const appStore = useAppStore()

const validation = {
  name: useValidation(name, {
    minLength: {
      value: 4,
      callback(value) {
        appStore.toasts.push(`Minimum ${value} chars in name`)
      }
    },
    maxLength: {
      value: 20,
      callback(value) {
        appStore.toasts.push(`Maximum ${value} chars in name`)
      }
    },
    alphaNumeric: {
      callback() {
        appStore.toasts.push(`Name must be alphanumeric`)
      }
    }
  }),
  username: useValidation(username, {
    minLength: {
      value: 4,
      callback(value) {
        appStore.toasts.push(`Minimum ${value} chars in login`)
      }
    },
    maxLength: {
      value: 15,
      callback(value) {
        appStore.toasts.push(`Maximum ${value} chars in login`)
      }
    },
    alphaNumeric: {
      callback() {
        appStore.toasts.push(`Login must be alphanumeric`)
      }
    }
  }),
  password: useValidation(password, {
    minLength: {
      value: 8,
      callback(value) {
        appStore.toasts.push(`Minimum ${value} chars in password`)
      }
    },
    maxLength: {
      value: 30,
      callback(value) {
        appStore.toasts.push(`Maximum ${value} chars in password`)
      }
    },
    hasCapital: {
      callback() {
        appStore.toasts.push(`Password must contain at least one uppercase letter`)
      }
    },
    hasLowercase: {
      callback() {
        appStore.toasts.push(`Password must contain at least one lowercase letter`)
      }
    },
    hasSpecial: {
      callback() {
        appStore.toasts.push(`Password must contain at least one of symbols !@#$%^&*(),.?":{}|<>`)
      }
    }
  })
}
function onSubmit() {
  validation.name.validate()
  validation.username.validate()
  validation.password.validate()
  if (
    validation.password.silenseIsValid.value &&
    validation.username.silenseIsValid.value &&
    validation.name.silenseIsValid.value
  ) {
    emit('sign-up')
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    onSubmit()
  }
}

onMounted(() => {
  addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    class="sign-up-form form"
    @keydown.enter="onSubmit"
  >
    <text-input-element
      v-model="name"
      class="name-input"
      type='text'
      placeholder="Name..."
      :invalid="!validation.name.isValid.value"
      autocomplete="name"
      maxlength="47"
      color='success'
    ></text-input-element>
    <text-input-element
      v-model="username"
      class="login-input"
      type='text'
      placeholder="Login..."
      :invalid="!validation.username.isValid.value"
      autocomplete="username"
      maxlength="47"
      color='success'
    ></text-input-element>
    <text-input-element
      v-model="password"
      class="password-input"
      type='password'
      placeholder="Password..."
      :invalid="!validation.password.isValid.value"
      autocomplete="new-password"
      maxlength="47"
      color='success'
    ></text-input-element>
    <div class="button-container">
      <button-element
        color="success"
        @click="onSubmit"
      >Sign Up</button-element>
    </div>
  </div>
</template>

<style scoped>
.text-input-element {
  position: relative;
  width: 100%;
}

.button-container {
  margin-left: auto;
}
</style>
