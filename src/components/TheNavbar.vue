<template>
  <el-menu
    mode="horizontal"
    :default-active="activeMenu"
    :ellipsis="false"
    :router="true"
  >
    <el-menu-item
      index="/"
      route="/"
    >
      Главная
    </el-menu-item>

    <el-sub-menu index="/categoris">
      <template #title>Категории</template>
      <el-menu-item
        :route="`/categories/${slug}`"
        :index="`/categories/${slug}`"
        :key="slug"
        v-for="{ title, slug } in categories"
      >
        {{ title }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useCategoriesStore } from "../stores"

const route = useRoute()
const categoriesStore = useCategoriesStore()

const categories = computed(() => categoriesStore.getCategories)
const activeMenu = computed(() => route.path)
</script>
