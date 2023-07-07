<template>
  <div class="user-menu">
    <el-button
      class="btn"
      type="primary"
      v-if="!isAuthenticated"
      @click="openModal"
    >
      Войти
    </el-button>

    <div
      class="user"
      v-else
    >
      <span class="user-name">{{ authStore.getUser.username }}</span>

      <el-button
        class="btn"
        type="primary"
        @click="useLogout()"
      >
        Выйти
      </el-button>
    </div>
  </div>

  <BaseModal
    title="Вход"
    v-model="modalVisible"
  >
    <BaseAuth
      :modalVisible="modalVisible"
      @closeModal="modalVisible = false"
    />
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import { useRouter } from "vue-router"

import BaseModal from "./BaseModal.vue"
import BaseAuth from "./BaseAuth.vue"
import { useCategoriesStore, useAuthStore } from "../stores"

const router = useRouter()
const categoriesStore = useCategoriesStore()
const authStore = useAuthStore()

const modalVisible = ref(false)

const openModal = () => {
  modalVisible.value = true
}

const isAuthenticated = computed(() => {
  if (authStore.getAuthStatus) return true
})

const useLogout = () => {
  router.push("/")
  categoriesStore.resetItems()

  authStore.useLogout()
}
</script>

<style scoped lang="scss">
.user-menu {
  display: flex;
  align-items: center;
  height: 100%;
  border-bottom: solid 1px var(--el-menu-border-color);
}

.btn {
  width: 80px;
}

.user {
  display: flex;
  align-items: center;
  gap: 20px;

  &-name {
    @media (min-width: 576px) {
      font-size: var(--el-font-size-base);
      color: var(--el-text-color-primary);
    }
    @media (max-width: 575px) {
      display: none;
    }
  }
}
</style>
