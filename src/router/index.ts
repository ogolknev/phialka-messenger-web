import { createMemoryHistory, createRouter } from 'vue-router'

import MainView from '@/components/views/MainView.vue'
import AuthView from '@/components/views/AuthView.vue'
import ProfileEditView from '@/components/views/ProfileEditView.vue'
import ServerCreateView from '@/components/views/ServerCreateView.vue'
import ServerEditView from '@/components/views/ServerEditView.vue'
// import DevelopmentView from "@/components/views/DevelopmentView.vue";

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: MainView,
    },
    {
      path: '/auth',
      component: AuthView,
    },
    {
      path: '/profile',
      children: [{ path: 'edit', component: ProfileEditView }],
    },
    {
      path: '/servers',
      children: [
        {
          path: 'create',
          component: ServerCreateView,
        },
        {
          path: 'edit/:id',
          component: ServerEditView,
        },
      ],
    },
  ],
})
