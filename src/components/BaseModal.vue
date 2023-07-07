<template>
  <el-dialog
    class="modal"
    width="40%"
    :title="title"
    :align-center="true"
  >
    <slot></slot>
  </el-dialog>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<style lang="scss">
.modal {
  @media (min-width: 376px) {
    width: max(40%, 370px);
  }
  @media (max-width: 375px) {
    min-width: 300px;
  }
}
</style>
