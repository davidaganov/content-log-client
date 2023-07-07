<template>
  <ul
    class="list"
    v-if="items && items.length > 0"
  >
    <TransitionGroup name="items">
      <BaseListItem
        :key="item.slug"
        v-bind="item"
        v-for="item in items"
      />
    </TransitionGroup>
  </ul>
</template>

<script setup lang="ts">
import type { Item } from "../interfaces"
import BaseListItem from "./BaseListItem.vue"

defineProps<{ items: Item[] }>()
</script>

<style scoped lang="scss">
// .items {
//   &-enter-active,
//   &-leave-active {
//     transition: all 0.3s ease;
//   }

//   &-enter-from {
//     opacity: 0;
//   }
//   &-leave-to {
//     opacity: 0;
//   }
// }

.list {
  display: grid;
  gap: 15px;
  margin-top: 15px;
}
</style>
