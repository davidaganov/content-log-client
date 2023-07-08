<template>
  <div class="create">
    <el-icon color="#272343">
      <Plus />
    </el-icon>

    <el-form
      class="create-form"
      ref="itemRef"
      :hide-required-asterisk="true"
      @submit.native.prevent="submitItem()"
    >
      <el-form-item prop="text">
        <el-input
          class="create-input"
          type="text"
          placeholder="Новый пункт"
          v-model="name"
        />
      </el-form-item>

      <el-button
        type="primary"
        native-type="submit"
        :disabled="name.length === 0"
      >
        Добавить
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { TabSlug, type Item } from "../interfaces"
import { type FormInstance } from "element-plus"

import { ref } from "vue"
import { useRoute } from "vue-router"
import { Plus } from "@element-plus/icons-vue"

import { useCategoriesStore } from "../stores"
import { useTransliterate } from "../composables/useTransliterate"
import { addItem } from "../services/items"

const props = defineProps<{ tab: TabSlug }>()

const route = useRoute()
const categoriesStore = useCategoriesStore()

const itemRef = ref<FormInstance>()
const name = ref("")

const fetchItems = () => {
  categoriesStore.setItems(route.params.slug.toString())
}

const submitItem = async () => {
  const title = name.value

  if (title.length > 0) {
    const item: Item = {
      title,
      url: "",
      tab: props.tab,
      createdBy: new Date(),
      rating: 0,
      description: "",
      category: route.params.slug.toString(),
      slug: useTransliterate(title)
    }

    name.value = ""
    await addItem(item)
    fetchItems()
  }
}
</script>

<style scoped lang="scss">
.create {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 15px;

  &-form {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 10px;
    width: 100%;

    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
