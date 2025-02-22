<script setup lang='ts'>
import InputText from '../elements/InputText.vue';
import ButtonDefault from '../elements/ButtonDefault.vue';
import { onMounted, onUnmounted } from 'vue';
import { useValidation } from '@/utils/composables/validation';
import { useStore } from '@/store';


const username = defineModel<string>('username', { required: true })
const password = defineModel<string>('password', { required: true })
const emit = defineEmits(['sign-in'])

const store = useStore()

const validation = {
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
    //     store.toasts.push(`Password must contain at least one\nuppercase letter`)
    //   }
    // },
    // hasLowercase: {
    //   callback() {
    //     store.toasts.push(`Password must contain at least one\nlowercase letter`)
    //   }
    // },
    // hasSpecial: {
    //   callback() {
    //     store.toasts.push(`Password must contain at least one\nof symbols !@#$%^&*(),.?":{}|<>`)
    //   }
    // }
  })
}

function onSubmit() {
  validation.username.validate()
  validation.password.validate()
  if (
    validation.username.silenseIsValid.value &&
    validation.password.silenseIsValid.value
  ) {
    emit('sign-in')
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
  <form class="form-sign-in form">
    <InputText class="input login-input" :invalid="!validation.username.isValid.value" type='text'
      v-model="username" placeholder="Login..." autocomplete="username" maxlength="47"></InputText>
    <InputText v-model="password" class="input password-input" :invalid="!validation.password.isValid.value"
      type='password' placeholder="Password..." maxlength="47" autocomplete="current-password"></InputText>
    <div class="button-container">
      <ButtonDefault tabindex="0" @click.prevent="onSubmit">Sign In</ButtonDefault>
    </div>
  </form>
</template>

<style scoped>
.input {
  width: 100%;
}

.button-container {
  margin-left: auto;
}
</style>
