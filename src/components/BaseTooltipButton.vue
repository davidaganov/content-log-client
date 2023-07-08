<template>
  <el-tooltip
    :placement="placement"
    :visible="tooltip.visible"
  >
    <template #content>
      <span>{{ label }}</span>
    </template>
    <el-button
      :plain="plain"
      :circle="circle"
      :native-type="nativeType"
      :type="type"
      :aria-label="label"
      @click="emits('funcResult', func)"
      @mouseenter="showTooltip(tooltip)"
      @mouseleave="cancelTooltip(tooltip)"
    >
      <el-icon
        :class="{ rotate }"
        :style="{ transform: rotate && model ? `rotate(${rotate.deg}deg)` : '' }"
      >
        <component :is="icon" />
      </el-icon>
    </el-button>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { showTooltip, cancelTooltip } from "../composables/toggleTooltip"

const emits = defineEmits(["funcResult"])

withDefaults(
  defineProps<{
    placement?: string
    label?: string
    plain?: boolean
    circle?: boolean
    rotate?: { deg: number }
    type?: string
    nativeType?: string
    model?: boolean
    func: () => void
    icon: any
  }>(),
  {
    placement: "bottom-start",
    label: "Подсказка",
    plain: true,
    type: "default",
    nativeType: "button"
  }
)

const tooltip = ref({
  visible: false,
  timeoutId: null
})
</script>

<style scoped lang="scss">
.rotate {
  transition: transform var(--el-transition-duration);
}
</style>
