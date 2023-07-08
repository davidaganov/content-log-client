<template>
  <el-main>
    <el-empty description="404 - Страница не найдена">
      <p class="info">Такой страницы нет или она не существует</p>
      <RouterLink
        class="link el-link el-link--primary"
        to="/"
      >
        Вернуться на главную
      </RouterLink>
    </el-empty>
  </el-main>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<style scoped lang="scss">
.info {
  margin-top: 20px;
}

.link {
  margin-top: 10px;
}
</style>
