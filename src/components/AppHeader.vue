<template>
  <el-header class="header">
    <AppNavbar />
    <UserMenu />
  </el-header>
</template>

<script setup lang="ts">
import AppNavbar from "./AppNavbar.vue"
import UserMenu from "./UserMenu.vue"
</script>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 15px;
}
</style>
