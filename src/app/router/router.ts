import {
  ChannelCreatePage,
  DevPage,
  LoginPage,
  MessengerPage,
  RegisterPage,
  ServerCreatePage,
  ServerEditPage,
} from "@/pages"
import { createMemoryHistory, createRouter } from "vue-router"
import type { NamedRouteRecordRaw } from "vue-routes-to-types"

export const routes = [
  {
    path: "/",
    component: MessengerPage,
    name: "messenger",
  },
  {
    path: "/dev",
    component: DevPage,
    name: "dev",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "register",
  },
  {
    path: "/server",
    children: [
      {
        path: "create",
        component: ServerCreatePage,
        name: "server-create",
      },
      {
        path: ":serverId/edit",
        component: ServerEditPage,
        name: "server-edit",
      },
      {
        path: ":serverId/channel",
        children: [
          {
            path: "create",
            component: ChannelCreatePage,
            name: "channel-create",
          },
        ],
        name: "channel",
      },
    ],
    name: "server",
  },
] as const satisfies NamedRouteRecordRaw[]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
