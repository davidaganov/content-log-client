<template>
  <div class="common-layout">
    <el-container class="is-vertical">
      <AppHeader />
      <RouterView />
      <AppFooter />
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import { onMounted } from "vue"

import AppHeader from "./components/AppHeader.vue"
import AppFooter from "./components/AppFooter.vue"
import { useCategoriesStore } from "./stores"

const categoriesStore = useCategoriesStore()

onMounted(() => {
  if (categoriesStore.getCategories.length === 0) categoriesStore.setCategories()
  if (categoriesStore.getTabs.length === 0) categoriesStore.setTabs()
})
</script>

<style scoped lang="scss"></style>
