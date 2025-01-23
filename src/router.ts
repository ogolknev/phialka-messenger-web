import { createMemoryHistory, createRouter } from "vue-router";

import AuthView from "@/views/AuthView.vue";
import ProfileEditView from "@/views/ProfileEditView.vue";

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/auth",
      component: AuthView
    },
    {
      path: "/profile",
      children: [
        { path: "edit", component: ProfileEditView }
      ]
    }
  ]
})
