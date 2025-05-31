import {
  AuthPage,
  ChannelCreatePage,
  ChannelEditPage,
  DevPage,
  MessengerPage,
  ServerCreatePage,
  ServerEditPage,
  ServerUsersEdit,
} from '@/pages'
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
      path: '/dev',
      component: DevPage,
      name: 'dev',
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
    {
      path: '/server/:id/users',
      component: ServerUsersEdit,
      name: 'server-users-edit',
    },
    {
      path: '/channel/create',
      component: ChannelCreatePage,
      name: 'channel-create',
    },
    {
      path: '/channel/:id/edit',
      component: ChannelEditPage,
      name: 'channel-edit',
    },
  ],
})
