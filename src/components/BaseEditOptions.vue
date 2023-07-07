<template>
  <el-form
    label-position="top"
    require-asterisk-position="right"
    ref="optionsRef"
    :model="itemOptions"
    :rules="rules"
    @submit.native.prevent="emits('updateOptions', itemOptions)"
  >
    <el-form-item
      class="label"
      :label="text"
      :prop="name"
      :required="data ? data.some((rule) => rule.required) : false"
      :key="name"
      v-for="{ name, text, placeholder, data } in fields"
    >
      <el-input
        :class="name === 'description' ? 'textarea' : ''"
        :type="name === 'description' ? 'textarea' : 'text'"
        :placeholder="placeholder"
        :required="data ? data.some((rule) => rule.required) : false"
        v-model="itemOptions[name]"
        v-if="name !== 'rating'"
      />
    </el-form-item>

    <el-form-item class="rating">
      <el-rate
        :allow-half="true"
        :colors="['#A7713E', '#F7BA2A', '#FF9900']"
        v-model="itemOptions.rating"
      />
    </el-form-item>

    <div class="modal-control">
      <el-button
        plain
        class="modal-btn"
        type="info"
        @click="emits('closeModal')"
      >
        Отменить
      </el-button>
      <el-button
        class="modal-btn"
        type="primary"
        native-type="submit"
      >
        Подтвердить
      </el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import type { Item, OptionsForm } from "../interfaces"
import { type FormInstance, type FormRules } from "element-plus"

import { reactive, ref } from "vue"

const emits = defineEmits(["closeModal", "updateOptions"])
const prop = defineProps<{ item: Item; modalVisible: boolean }>()

const fields = [
  {
    name: "title",
    text: "Название",
    placeholder: "Введите название",
    data: [
      { required: true, message: "Введите название", trigger: "blur" },
      { min: 1, trigger: ["blur", "change"] }
    ]
  },
  {
    name: "url",
    text: "Ссылка",
    placeholder: "Введите ссылку"
  },
  {
    name: "description",
    text: "Описание",
    placeholder: "Введите описание"
  }
]

const optionsRef = ref<FormInstance>()

const rules = reactive<FormRules<OptionsForm>>({
  title: fields[0].data
})

const itemOptions: Record<string, string | number> = reactive({
  title: prop.item.title,
  url: prop.item.url ? prop.item.url : "",
  description: prop.item.description ? prop.item.description : "",
  rating: prop.item.rating ? prop.item.rating : 0
})
</script>

<style scoped lang="scss">
.modal {
  &-control {
    display: flex;
    justify-content: flex-end;
  }
}

.label {
  &:nth-of-type(3) {
    margin-bottom: 10px;
  }
}

.textarea {
  :deep(textarea) {
    height: 80px;
    resize: none;
  }
}

.rating {
  :deep(.el-rate) {
    gap: 3px;
  }
  :deep(.el-rate__item) {
    transform: scale(1.2);
  }
}
</style>
