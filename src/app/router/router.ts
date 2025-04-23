import { AuthPage } from '@/pages'
import { createMemoryHistory, createRouter } from 'vue-router'

export const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/auth',
      component: AuthPage,
    },
  ],
})
