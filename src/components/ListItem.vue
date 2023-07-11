<template>
  <div class="item">
    <div v-if="!editForm">
      <div class="block">
        <BaseTooltipButton
          :model="showMore"
          v-bind="control.more"
          @funcResult="control.more.func"
        />

        <h3
          class="block-title"
          :id="`item-${item._id}`"
        >
          {{ item.title }}
        </h3>

        <el-rate
          class="block-rating"
          disabled
          :model-value="item.rating"
          :colors="['#A7713E', '#F7BA2A', '#FF9900']"
          v-if="item.rating !== 0"
        />

        <div class="block-control">
          <BaseTooltipButton
            :key="item.label"
            v-for="item in control.default"
            v-bind="item"
            @funcResult="item.func"
          />
        </div>
      </div>

      <div
        class="more"
        role="region"
        :id="`panel-${item._id}`"
        :aria-hidden="showMore"
        :aria-labelledby="`item-${item._id}`"
      >
        <div>
          <div class="more-content">
            <p class="more-label">Описание:</p>

            <p
              class="more-description"
              v-if="item.description"
            >
              {{ item.description }}
            </p>

            <p
              class="more-description more-description--empty"
              v-else
            >
              Описание отсутствует
            </p>

            <el-rate
              class="more-rating"
              disabled
              :model-value="item.rating"
              :colors="['#A7713E', '#F7BA2A', '#FF9900']"
              v-if="item.rating !== 0"
            />

            <div class="more-bottom">
              <el-link
                class="more-link"
                type="primary"
                :href="item.url"
                :icon="Link"
                :underline="false"
                v-if="item.url"
              >
                Источник
              </el-link>

              <time
                class="more-date"
                :datetime="date"
              >
                {{ date }}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-form
      class="block form"
      :class="{ 'form-error': error }"
      @submit.native.prevent="titleField.length > 0 ? confirmChangeTitle() : null"
      v-else
    >
      <el-button
        disabled
        circle
        :icon="ArrowRight"
      />

      <el-input
        class="form-input"
        type="text"
        placeholder="Введите новое название"
        ref="inputRef"
        v-model="titleField"
        @focusout="editMode = false"
        @keydown.enter="editMode = false"
        @input="titleField.length > 0 ? (error = false) : (error = true)"
      />

      <div class="form-control">
        <BaseTooltipButton
          :key="item.label"
          v-for="item in control.edit"
          v-bind="item"
          @funcResult="item.func"
        />
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { type Item } from "../interfaces"

import { ref, markRaw, nextTick, type Ref } from "vue"
import { ArrowRight, Link, Check, Delete, Edit, Tools } from "@element-plus/icons-vue"

import { useRoute } from "vue-router"

import BaseTooltipButton from "./BaseTooltipButton.vue"
import { useCategoriesStore } from "../stores"
import { deleteItem } from "../services/items"

const emits = defineEmits(["openModal", "updateTitle"])
const item = defineProps<Item>()

const route = useRoute()
const categoriesStore = useCategoriesStore()

const error = ref(false)
const inputRef: Ref<HTMLInputElement | null> = ref(null)
const editForm = ref(false)
const editMode = ref(false)
const titleField = ref(item.title)
const showMore = ref(false)

const date = new Date(item.createdBy).toLocaleString("ru", {
  year: "numeric",
  month: "long",
  day: "numeric"
})

const control = {
  more: {
    placement: "top-start",
    label: "Подробности",
    circle: true,
    rotate: { deg: 90 },
    icon: ArrowRight,
    func: () => (showMore.value = !showMore.value)
  },
  default: [
    {
      label: "Дополнительные настройки",
      icon: markRaw(Tools),
      func: () => emits("openModal")
    },
    {
      label: "Редактировать запись",
      icon: markRaw(Edit),
      func: () => editTitle()
    }
  ],
  edit: [
    {
      label: "Удалить запись",
      type: "danger",
      icon: markRaw(Delete),
      func: () => removeItem()
    },
    {
      label: "Подтвердить изменения",
      plain: false,
      type: "primary",
      nativeType: "submit",
      icon: markRaw(Check),
      func: () => null
    }
  ]
}

const fetchItems = () => {
  categoriesStore.setItems(route.params.slug.toString())
}

const editTitle = () => {
  showMore.value = false
  editForm.value = true
  editMode.value = true

  nextTick(() => {
    if (inputRef.value) inputRef.value.focus()
  })
}

const confirmChangeTitle = () => {
  editForm.value = false

  emits("updateTitle", titleField.value)
}

const removeItem = async () => {
  if (item._id) await deleteItem(item._id)
  fetchItems()
}
</script>

<style scoped lang="scss">
.item {
  border: 1px solid var(--el-border-color-light);
  padding: var(--el-menu-base-level-padding);
}

.block {
  display: grid;
  grid-template-columns: 34px 1fr auto auto;
  grid-template-rows: 0fr;
  align-items: center;
  gap: 12px;
  &-title {
    color: var(--el-text-color-primary);
    font-size: var(--el-font-size-base);
    word-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &-rating {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &-more {
    transform: scale(0.8);
  }

  &-control {
    grid-column: 4 / 5;
  }
}

.more {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s;
  &[aria-hidden="true"] {
    grid-template-rows: 1fr;
  }

  > div {
    overflow: hidden;
  }

  &-content {
    padding-top: 20px;
  }

  &-label {
    margin-bottom: 10px;
    color: var(--el-color-info);
  }

  &-description {
    max-width: 85%;
    color: var(--el-text-color-primary);
    word-wrap: break-word;
    @media (min-width: 769px) {
      margin-bottom: 25px;
    }
    @media (max-width: 768px) {
      margin-bottom: 10px;
    }
  }

  &-bottom {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 10px;
    @media (max-width: 768px) {
      margin-top: 15px;
    }
  }

  &-link {
    grid-column: 1 / 2;
    display: inline-flex;
    margin-right: auto;
    gap: 5px;
  }

  &-date {
    grid-column: 2 / 3;
    display: inline-flex;
    justify-content: end;
    color: var(--el-color-info-light-3);
  }
}

.form {
  border-color: var(--el-color-primary);

  &-error {
    border-color: var(--el-color-danger);
  }

  &-input {
    :deep(.el-input__wrapper) {
      box-shadow: none;
      padding: 0;
    }
    :deep(.el-input__inner) {
      color: var(--el-text-color-primary);
      font-size: var(--el-font-size-base);
    }
  }

  &-control {
    grid-column: 4 / 5;
  }
}
</style>
