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
          v-for="{ title, slug } in categoriesStore.getTabs"
        >
          <BaseCreateItem :tab="slug" />

          <ListContainer
            :items="getItems()"
            v-if="items.data"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

import ListContainer from "./ListContainer.vue"
import BaseCreateItem from "./BaseCreateItem.vue"
import { useCategoriesStore } from "../stores"

const route = useRoute()
const router = useRouter()
const categoriesStore = useCategoriesStore()

const activeTab = ref("halfway")

const items = ref(categoriesStore.getItems)

const fetchItems = () => {
  const category = route.params.slug.toString()
  const categories = ["anime", "games", "cartoons", "series", "movies"]

  if (categories.find((item) => item === category)) {
    categoriesStore.setItems(category)
  } else {
    router.push("/404")
  }
}

const getItems = () => {
  return items.value.data.filter((item) => item.tab === activeTab.value)
}

onMounted(fetchItems)

watch(
  () => route.params.slug,
  () => (route.params.slug ? fetchItems() : null)
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
