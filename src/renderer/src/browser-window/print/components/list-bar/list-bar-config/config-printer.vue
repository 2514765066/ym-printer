<template>
  <ElFormItem label="打印机" label-position="top" :rules="rule" prop="printer">
    <ElSelect v-model="config.printer" placeholder="请选择打印机">
      <ElOption v-for="item in printers" :key="item" :value="item" />
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElSelect, ElOption, ElFormItem, FormItemRule } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());

const printers = ref<string[]>([]);

const rule: FormItemRule = {
  required: true,
  message: "请选择打印机",
};

onMounted(async () => {
  printers.value = await ipcRenderer.invoke("getPrinters");
});
</script>

<style scoped lang="scss"></style>
