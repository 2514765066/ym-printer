<template>
  <ElFormItem label="打印机" label-position="top" prop="printer">
    <ElSelect v-model="model" placeholder="请选择打印机">
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
import { ElSelect, ElOption, ElFormItem } from "element-plus";

const model = defineModel<string>();

const data = ref<Printer[]>([]);

const init = async () => {
  data.value = await ipcRenderer.invoke("getPrinter");
};

init();
</script>

<style scoped lang="scss"></style>
