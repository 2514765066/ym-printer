<template>
  <div class="flex flex-col gap-2">
    <span class="text-sub text-sm">是否继续打印奇数页和单页?</span>

    <div class="flex">
      <ElButton class="flex-1" type="primary" @click="emits('confirm')">
        继续
      </ElButton>

      <ElButton class="flex-1" @click="emits('cancel')">取消</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";

const emits = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<style scoped lang="scss"></style>
