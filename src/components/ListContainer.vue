<template>
  <ul
    class="list"
    v-if="items && items.length > 0"
  >
    <ListItemWrapper
      :key="item.slug"
      v-bind="item"
      v-for="item in items"
    />
  </ul>
</template>

<script setup lang="ts">
import type { Item } from "../interfaces"
import ListItemWrapper from "./ListItemWrapper.vue"

defineProps<{ items: Item[] }>()
</script>

<style scoped lang="scss">
.list {
  display: grid;
  gap: 15px;
  margin-top: 15px;
}
</style>
