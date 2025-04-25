import { AuthPage, MessengerPage } from '@/pages'
import { createMemoryHistory, createRouter } from 'vue-router'

export const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '',
      component: MessengerPage,
      name: 'messenger',
    },
    {
      path: '/auth',
      component: AuthPage,
      name: 'auth',
    },
  ],
})
