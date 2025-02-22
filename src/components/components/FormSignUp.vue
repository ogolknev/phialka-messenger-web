<script setup lang='ts'>
import InputText from '../elements/InputText.vue';
import ButtonDefault from '../elements/ButtonDefault.vue';
import { useValidation } from '@/utils/composables/validation';
import { onMounted, onUnmounted } from 'vue';
import { useStore } from '@/store';


const name = defineModel<string>('name', { required: true })
const username = defineModel<string>('username', { required: true })
const password = defineModel<string>('password', { required: true })
const emit = defineEmits(['sign-up'])

const store = useStore()

const validation = {
  name: useValidation(name, {
    minLength: {
      value: 4,
      callback(value) {
        store.toasts.push(`Minimum ${value} chars in name`)
      }
    },
    maxLength: {
      value: 20,
      callback(value) {
        store.toasts.push(`Maximum ${value} chars in name`)
      }
    },
    alphaNumeric: {
      callback() {
        store.toasts.push(`Name must be alphanumeric`)
      }
    }
  }),
  username: useValidation(username, {
    minLength: {
      value: 4,
      callback(value) {
        store.toasts.push(`Minimum ${value} chars in login`)
      }
    },
    maxLength: {
      value: 15,
      callback(value) {
        store.toasts.push(`Maximum ${value} chars in login`)
      }
    },
    alphaNumeric: {
      callback() {
        store.toasts.push(`Login must be alphanumeric`)
      }
    }
  }),
  password: useValidation(password, {
    minLength: {
      value: 8,
      callback(value) {
        store.toasts.push(`Minimum ${value} chars in password`)
      }
    },
    maxLength: {
      value: 30,
      callback(value) {
        store.toasts.push(`Maximum ${value} chars in password`)
      }
    },
    // hasCapital: {
    //   callback() {
    //     store.toasts.push(`Password must contain at least one uppercase letter`)
    //   }
    // },
    // hasLowercase: {
    //   callback() {
    //     store.toasts.push(`Password must contain at least one lowercase letter`)
    //   }
    // },
    // hasSpecial: {
    //   callback() {
    //     store.toasts.push(`Password must contain at least one of symbols !@#$%^&*(),.?":{}|<>`)
    //   }
    // }
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
  <div class="form-sign-up form" @keydown.enter="onSubmit">
    <InputText v-model="name" class="input name-input" type='text' placeholder="Name..."
      :invalid="!validation.name.isValid.value" autocomplete="name" maxlength="47" color='success'></InputText>
    <InputText v-model="username" class="input login-input" type='text' placeholder="Login..."
      :invalid="!validation.username.isValid.value" autocomplete="username" maxlength="47"
      color='success'></InputText>
    <InputText v-model="password" class="input password-input" type='password' placeholder="Password..."
      :invalid="!validation.password.isValid.value" autocomplete="new-password" maxlength="47"
      color='success'></InputText>
    <div class="button-container">
      <ButtonDefault color="success" @click.prevent="onSubmit">Sign Up</ButtonDefault>
    </div>
  </div>
</template>

<style scoped>
.input {
  position: relative;
  width: 100%;
}

.button-container {
  margin-left: auto;
}
</style>
