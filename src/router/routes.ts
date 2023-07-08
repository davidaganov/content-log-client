import { type RouteRecordRaw } from "vue-router"

import HomeView from "../views/HomeView.vue"
import TabView from "../views/TabView.vue"
import NotFoundView from "../views/NotFoundView.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "Home",
    component: HomeView
  },
  {
    path: "/categories/:slug",
    name: "Tab",
    component: TabView
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFoundView
  }
]

export default routes
