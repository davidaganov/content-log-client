<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane
      label="Авторизация"
      name="login"
    >
      <el-form
        label-position="top"
        ref="loginRef"
        require-asterisk-position="right"
        :model="loginForm"
        :rules="rules"
        @submit.native.prevent="submitForm({ type: 'login', form: loginRef })"
      >
        <el-form-item
          :label="text"
          :prop="name"
          :required="data.some((rule) => rule.required)"
          :key="name"
          v-for="{ name, text, placeholder, data } in fields"
        >
          <el-input
            :type="name === 'password' ? 'password' : 'text'"
            :placeholder="placeholder"
            :required="data.some((rule) => rule.required)"
            v-model="loginForm[name]"
          />
        </el-form-item>

        <el-button
          class="btn"
          type="primary"
          native-type="submit"
        >
          Войти
        </el-button>
      </el-form>
    </el-tab-pane>

    <el-tab-pane
      label="Регистрация"
      name="register"
    >
      <el-form
        label-position="top"
        ref="registerRef"
        require-asterisk-position="right"
        :model="registerForm"
        :rules="rules"
        @submit.native.prevent="submitForm({ type: 'register', form: registerRef })"
      >
        <el-form-item
          :label="text"
          :prop="name"
          :required="data.some((rule) => rule.required)"
          :key="name"
          v-for="{ name, text, placeholder, data } in fields"
        >
          <el-input
            :type="name === 'password' ? 'password' : 'text'"
            :placeholder="placeholder"
            :required="data.some((rule) => rule.required)"
            v-model="registerForm[name]"
          />
        </el-form-item>

        <el-button
          class="btn"
          type="primary"
          native-type="submit"
        >
          Зарегистрироваться
        </el-button>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import type { AuthForm } from "../interfaces"

import { watch, ref, reactive } from "vue"
import { useRoute } from "vue-router"
import { ElMessage, type FormInstance, type FormRules } from "element-plus"

import { useAuth } from "../services/auth"
import { useCategoriesStore, useAuthStore } from "../stores"

interface SubmitForm {
  type: "login" | "register"
  form: FormInstance | undefined
}

interface Message {
  type: "error" | "success"
  message: string | undefined
}

const route = useRoute()
const categoriesStore = useCategoriesStore()
const authStore = useAuthStore()

const emits = defineEmits(["closeModal"])
const props = defineProps<{ modalVisible: boolean }>()

const fields = [
  {
    name: "username",
    text: "Логин",
    placeholder: "Введите имя",
    data: [
      { required: true, message: "Пожалуйста, введите имя", trigger: "blur" },
      { min: 3, message: "Имя слишком короткое", trigger: ["blur", "change"] }
    ]
  },
  {
    name: "password",
    text: "Пароль",
    placeholder: "Введите пароль",
    data: [
      { required: true, message: "Пожалуйста, введите пароль", trigger: "blur" },
      { min: 4, message: "Пароль слишком короткий", trigger: ["blur", "change"] }
    ]
  }
]

const activeTab = ref("login")
const loginRef = ref<FormInstance>()
const registerRef = ref<FormInstance>()

const loginForm = reactive<Record<string, string>>({
  username: "",
  password: ""
})

const registerForm = reactive<Record<string, string>>({
  username: "",
  password: ""
})

const rules = reactive<FormRules<AuthForm>>({
  username: fields[0].data,
  password: fields[1].data
})

const resetForms = () => {
  loginRef.value?.resetFields()
  registerRef.value?.resetFields()
}

const showMessage = ({ type, message }: Message) => {
  ElMessage({ type, message })
}

const auth = async (method: "register" | "login") => {
  const { username, password } = method === "login" ? loginForm : registerForm
  const req = await useAuth({ method, username, password })

  if (req.username) {
    if (route.params.slug) categoriesStore.setItems(route.params.slug.toString())
    authStore.setUser(req.username)
    showMessage({ type: "success", message: req.message })
    emits("closeModal")
  } else {
    showMessage({ type: "error", message: req.message })
  }
}

const submitForm = async ({ type, form }: SubmitForm) => {
  if (!form) return

  await form.validate(async (valid) => {
    if (valid) {
      try {
        auth(type)
      } catch (err) {
        showMessage({ type: "error", message: "Произошла ошибка" })
      }
    }
  })
}

watch(props, () => {
  if (props.modalVisible) resetForms()
})
</script>

<style scoped lang="scss">
.btn {
  display: block;
  margin-left: auto;
}
</style>
