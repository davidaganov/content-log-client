import { type RouteRecordRaw } from "vue-router"

import HomeView from "../views/HomeView.vue"
import ItemsView from "../views/ItemsView.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "home",
    component: HomeView
  },
  {
    path: "/categories/:slug",
    name: "category",
    component: ItemsView
  }
]

export default routes
