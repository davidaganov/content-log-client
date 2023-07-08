import type { Category, Tab, Items } from "../interfaces"
import { defineStore } from "pinia"
import { getCategories, getTabs } from "../services/categories"
import { getItems } from "../services/items"

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    categories: [] as Category[],
    tabs: [] as Tab[],
    items: {} as Items
  }),

  getters: {
    getCategories: (state) => state.categories,
    getTabs: (state) => state.tabs,
    getItems: (state) => state.items
  },

  actions: {
    async setCategories() {
      const res = await getCategories()
      if (res) this.categories = res
    },

    async setTabs() {
      const res = await getTabs()
      if (res) this.tabs = res
    },

    async setItems(slug: string) {
      const res = await getItems(slug)
      if (res) {
        const items = this.categories.find((item) => item.slug === slug)

        this.items.title = `${items?.title}`
        this.items.data = res
      }
    },

    resetItems() {
      this.items.data = []
    }
  },

  persist: {
    paths: ["categories"]
  }
})
