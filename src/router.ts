import { createMemoryHistory, createRouter } from "vue-router";

import MainView from "./views/MainView.vue";
import AuthView from "@/views/AuthView.vue";
import ProfileEditView from "@/views/ProfileEditView.vue";

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/",
      component: MainView
    },
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
