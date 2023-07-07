<template>
  <section class="items">
    <h2 class="title">{{ items.title }}</h2>

    <div class="menu">
      <el-tabs
        type="card"
        v-model="activeTab"
      >
        <el-tab-pane
          :label="title"
          :name="slug"
          :key="slug"
          v-for="{ title, slug } in tabs"
        >
          <BaseCreateItem :tab="slug" />

          <BaseList
            :items="data"
            v-if="items.data && items.data.length !== 0"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Tab } from "../interfaces"

import { watch, computed, ref, onMounted } from "vue"
import { useRoute } from "vue-router"

import BaseList from "./BaseList.vue"
import BaseCreateItem from "./BaseCreateItem.vue"
import { useCategoriesStore } from "../stores"

const route = useRoute()
const categoriesStore = useCategoriesStore()

const activeTab = ref("finished")
const tabs = [
  {
    title: "В процессе",
    slug: Tab.Halfway
  },
  {
    title: "Завершено",
    slug: Tab.Finished
  },
  {
    title: "Запланировано",
    slug: Tab.Planned
  },
  {
    title: "Отложено",
    slug: Tab.Delayed
  },
  {
    title: "Брошено",
    slug: Tab.Broken
  }
]

const items = computed(() => categoriesStore.getItems)
const data = computed(() => items.value.data.filter((item) => item.tab === activeTab.value))

const fetchItems = () => {
  categoriesStore.setItems(route.params.slug.toString())
}

onMounted(fetchItems)

watch(
  () => route.params.slug,
  () => fetchItems()
)
</script>

<style scoped lang="scss">
.items {
  padding-top: 20px;
}

.title {
  font-size: var(--el-font-size-extra-large);
  color: var(--el-text-color-primary);
  font-weight: bold;
}

.menu {
  margin-top: 30px;
}

// .empty {
//   margin-top: 40px;
//   text-align: center;
//   &-title {
//     margin-bottom: 20px;
//     font-size: var(--el-font-size-medium);
//     color: var(--el-text-color-primary);
//   }
// }
</style>
