import { AuthPage, MessengerPage, ServerCreatePage, ServerEditPage } from '@/pages'
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
      path: '/server/create',
      component: ServerCreatePage,
      name: 'server-create',
    },
    {
      path: '/server/:id/edit',
      component: ServerEditPage,
      name: 'server-edit',
    },
  ],
})
