<template>
  <el-form
    label-position="top"
    require-asterisk-position="right"
    ref="optionsRef"
    :model="itemOptions"
    :rules="rules"
    @submit.native.prevent="confirmChangeOptions(optionsRef)"
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
        v-if="name !== 'rating' && name !== 'tab'"
      />

      <el-select
        class="select"
        :placeholder="placeholder"
        v-model="itemOptions[name]"
        v-if="name === 'tab'"
      >
        <el-option
          :label="title"
          :value="slug"
          :key="slug"
          v-for="{ title, slug } in categoriesStore.getTabs"
        />
      </el-select>
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

import { useCategoriesStore } from "../stores"

const emits = defineEmits(["closeModal", "updateOptions"])
const prop = defineProps<{ item: Item; modalVisible: boolean }>()

const categoriesStore = useCategoriesStore()

const validateLink = (_rule: any, value: string, callback: any) => {
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/
  if (urlPattern.test(value) || value.length === 0) {
    callback()
  } else {
    callback(new Error("Некорректный формат ссылки"))
  }
}

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
    name: "tab",
    text: "Секция",
    placeholder: "Выберите секцию"
  },
  {
    name: "url",
    text: "Ссылка",
    placeholder: "Введите ссылку",
    data: [
      {
        required: false,
        validator: validateLink,
        trigger: ["blur", "change"]
      }
    ]
  },
  {
    name: "description",
    text: "Описание",
    placeholder: "Введите описание",
    data: [
      {
        required: false,
        max: 80,
        message: "Описание не должно превышать 80 символов",
        trigger: ["blur", "change"]
      }
    ]
  }
]

const optionsRef = ref<FormInstance>()

const rules = reactive<FormRules<OptionsForm>>({
  title: fields[0].data,
  url: fields[2].data,
  description: fields[3].data
})

const itemOptions: Record<string, string | number> = reactive({
  title: prop.item.title,
  tab: prop.item.tab,
  url: prop.item.url ? prop.item.url : "",
  description: prop.item.description ? prop.item.description : "",
  rating: prop.item.rating ? prop.item.rating : 0
})

const confirmChangeOptions = async (form: FormInstance | undefined) => {
  if (!form) return

  await form.validate(async (valid) => {
    if (valid) {
      emits("updateOptions", itemOptions)
    }
  })
}
</script>

<style scoped lang="scss">
.modal {
  &-control {
    display: flex;
    justify-content: flex-end;
  }
}

.label {
  &:nth-of-type(4) {
    margin-bottom: 10px;
  }
}

.textarea {
  :deep(textarea) {
    height: 80px;
    resize: none;
  }
}

.select {
  width: 100%;
}

.rating {
  :deep(.el-rate) {
    gap: 3px;
  }
  :deep(.el-rate__item) {
    transform: scale(1.3);
  }
}
</style>
