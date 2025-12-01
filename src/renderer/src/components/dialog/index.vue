<template>
  <ElDialog
    :width="400"
    v-model="info.visible"
    :title="info.title"
    align-center
  >
    <span class="text-base">{{ info.content }}</span>

    <template #footer>
      <div class="dialog-footer">
        <ElButton text bg @click="info.cancel">
          {{ info.cancelButtonText || "取消" }}
        </ElButton>

        <ElButton type="primary" @click="info.confirm">
          {{ info.confirmButtonText || "确定" }}
        </ElButton>
      </div>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElButton } from "element-plus";
import { info } from "./index";
</script>

<style scoped lang="scss"></style>
