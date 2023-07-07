<template>
  <el-header class="header">
    <TheNavbar />
    <BaseUserMenu />
  </el-header>
</template>

<script setup lang="ts">
import TheNavbar from "./TheNavbar.vue"
import BaseUserMenu from "./BaseUserMenu.vue"
</script>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 15px;
}
</style>
