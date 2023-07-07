<template>
  <div class="common-layout">
    <el-container class="is-vertical">
      <TheHeader />
      <RouterView />
      <TheFooter />
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router"
import { useCategoriesStore } from "./stores"
import { onMounted } from "vue"

const categoriesStore = useCategoriesStore()

onMounted(() => {
  if (categoriesStore.getCategories.length === 0) categoriesStore.setCategories()
})
</script>

<style scoped lang="scss"></style>
