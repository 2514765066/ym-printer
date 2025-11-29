<template>
  <ElFormItem label="打印机" label-position="top" :rules="rule" prop="printer">
    <ElSelect v-model="config.printer" placeholder="请选择打印机">
      <ElOption
        v-for="item in data"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang="ts">
import { Printer } from "@type";
import { ElSelect, ElOption, ElFormItem, FormItemRule } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";

const { config } = storeToRefs(useConfigStore());

const data = ref<Printer[]>([]);

const rule: FormItemRule = {
  required: true,
  message: "请选择打印机",
};

const init = async () => {
  data.value = await ipcRenderer.invoke("getPrinter");
};

init();
</script>

<style scoped lang="scss"></style>
