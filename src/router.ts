import { createMemoryHistory, createRouter } from "vue-router";

import AuthView from "@/views/AuthView.vue";

export default createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: "/auth", component: AuthView }
  ]
})
