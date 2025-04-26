import { AuthPage, MessengerPage, ServerCreatePage } from '@/pages'
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
    {
      path: '/server-create',
      component: ServerCreatePage,
      name: 'server-create',
    },
  ],
})
