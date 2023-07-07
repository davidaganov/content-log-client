<template>
  <div
    class="row"
    v-if="!editForm"
  >
    <h3 class="row-title">
      {{ item.title }}
    </h3>

    <div>
      <el-rate
        :model-value="item.rating"
        disabled
        v-if="item.rating !== 0"
      />
    </div>

    <div class="item-control">
      <el-tooltip
        placement="bottom-start"
        :visible="tooltip.visible"
        :key="label"
        v-for="{ plain, type, nativeType, label, tooltip, icon, func } in defaultControlls"
      >
        <template #content>
          <span>{{ label }}</span>
        </template>
        <el-button
          :plain="plain"
          :native-type="nativeType"
          :type="type"
          :aria-label="label"
          :icon="icon"
          @click="func"
          @mouseenter="showTooltip(tooltip)"
          @mouseleave="cancelTooltip(tooltip)"
        >
        </el-button>
      </el-tooltip>
    </div>
  </div>

  <el-form
    class="row form"
    :class="{ error }"
    @submit.native.prevent="titleField.length > 0 ? confirmChangeTitle() : null"
    v-else
  >
    <el-input
      class="input"
      type="text"
      placeholder="Введите новое название"
      ref="inputRef"
      v-model="titleField"
      @focusout="editMode = false"
      @keydown.enter="editMode = false"
      @input="titleField.length > 0 ? (error = false) : (error = true)"
    />

    <div>
      <el-tooltip
        placement="bottom-start"
        :visible="tooltip.visible"
        :key="label"
        v-for="{ plain, type, nativeType, label, tooltip, icon, func } in editControlls"
      >
        <template #content>
          <span>{{ label }}</span>
        </template>
        <el-button
          :plain="plain"
          :native-type="nativeType"
          :type="type"
          :aria-label="label"
          :icon="icon"
          @click="func"
          @mouseenter="showTooltip(tooltip)"
          @mouseleave="cancelTooltip(tooltip)"
        >
        </el-button>
      </el-tooltip>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { type Item } from "../interfaces"

import { ref, markRaw, nextTick, type Ref } from "vue"
import { Check, Delete, Edit, Tools } from "@element-plus/icons-vue"

import { useRoute } from "vue-router"

import { useCategoriesStore } from "../stores"
import { deleteItem } from "../services/items"
import { showTooltip, cancelTooltip } from "../composables/toggleTooltip"

const emits = defineEmits(["openModal", "updateTitle"])
const item = defineProps<Item>()

const route = useRoute()
const categoriesStore = useCategoriesStore()

const error = ref(false)
const inputRef: Ref<HTMLInputElement | null> = ref(null)
const editForm = ref(false)
const editMode = ref(false)
const titleField = ref(item.title)

const defaultControlls = ref([
  {
    plain: true,
    nativeType: "button",
    type: "default",
    label: "Дополнительные настройки",
    tooltip: {
      visible: false,
      timeoutId: null
    },
    icon: markRaw(Tools),
    func: () => emits("openModal")
  },
  {
    plain: true,
    nativeType: "button",
    type: "default",
    label: "Редактировать запись",
    tooltip: {
      visible: false,
      timeoutId: null
    },
    icon: markRaw(Edit),
    func: () => editItem()
  }
])

const editControlls = ref([
  {
    plain: true,
    nativeType: "button",
    type: "danger",
    label: "Удалить запись",
    tooltip: {
      visible: false,
      timeoutId: null
    },
    icon: markRaw(Delete),
    func: () => removeItem()
  },
  {
    plain: false,
    nativeType: "submit",
    type: "primary",
    label: "Подтвердить изменения",
    tooltip: {
      visible: false,
      timeoutId: null
    },
    icon: markRaw(Check),
    func: () => null
  }
])

const fetchItems = () => {
  categoriesStore.setItems(route.params.slug.toString())
}

const editItem = () => {
  editForm.value = true
  editMode.value = true

  nextTick(() => {
    if (inputRef.value) inputRef.value.focus()
  })
}

const confirmChangeTitle = () => {
  editForm.value = false
  defaultControlls.value[1].tooltip.visible = false

  emits("updateTitle", titleField.value)
}

const removeItem = async () => {
  if (item._id) await deleteItem(item._id)
  fetchItems()
}
</script>

<style scoped lang="scss">
.row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 12px;
  padding: var(--el-menu-base-level-padding);
  border: 1px solid var(--el-border-color-light);

  &-title {
    color: var(--el-text-color-primary);
    font-size: var(--el-font-size-base);
  }
}

.form {
  border-color: var(--el-color-primary);
}

.error {
  border-color: var(--el-color-danger);
}

.input {
  :deep(.el-input__wrapper) {
    box-shadow: none;
    padding: 0;
  }
  :deep(.el-input__inner) {
    color: var(--el-text-color-primary);
    font-size: var(--el-font-size-base);
  }
}
</style>
