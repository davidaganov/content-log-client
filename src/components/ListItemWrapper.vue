<template>
  <li class="item">
    <ListItem
      class="item-row"
      @openModal="modalVisible = true"
      @updateTitle="updateTitle"
      v-bind="item"
      v-if="item._id"
    />

    <BaseModal
      title="Редактирование"
      v-model="modalVisible"
    >
      <ListItemOptions
        :item="item"
        :modalVisible="modalVisible"
        @closeModal="modalVisible = false"
        @updateOptions="updateOptions"
      />
    </BaseModal>
  </li>
</template>

<script setup lang="ts">
import type { Item } from "../interfaces"

import { ref, toRaw } from "vue"
import { useRoute } from "vue-router"

import BaseModal from "./BaseModal.vue"
import ListItem from "./ListItem.vue"
import ListItemOptions from "./ListItemOptions.vue"
import { useCategoriesStore } from "../stores"
import { updateItem } from "../services/items"
import { useTransliterate } from "../composables/useTransliterate"

const item = defineProps<Item>()

const route = useRoute()
const categoriesStore = useCategoriesStore()

const modalVisible = ref(false)

const itemTitle = ref<Item>({ ...item })
const itemOptions = ref<Item>({ ...item })

const fetchItems = () => {
  categoriesStore.setItems(route.params.slug.toString())
}

const updateOptions = (newItem: Item) => {
  itemOptions.value = {
    ...itemOptions.value,
    ...newItem,
    slug: useTransliterate(newItem.title)
  }

  modalVisible.value = false
  confirmEditItem("options")
}

const updateTitle = (newTitle: string) => {
  itemTitle.value = {
    ...itemTitle.value,
    title: newTitle,
    slug: useTransliterate(newTitle)
  }

  confirmEditItem("title")
}

const confirmEditItem = async (type: "title" | "options") => {
  const newItem = type === "title" ? itemTitle.value : itemOptions.value

  if (JSON.stringify(toRaw(item)) !== JSON.stringify(toRaw(newItem))) {
    await updateItem(newItem)
    fetchItems()
  }
}
</script>

<style scoped lang="scss">
.item {
  display: grid;
  &-row {
    grid-row: 1 / 2;
  }
}

.title {
  color: var(--el-text-color-primary);
  font-size: var(--el-font-size-base);
  word-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
