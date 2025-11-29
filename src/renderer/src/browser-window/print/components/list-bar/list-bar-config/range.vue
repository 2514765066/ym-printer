<template>
  <ElFormItem label="打印范围" label-position="top" :rules="rule" prop="range">
    <ElTooltip trigger="focus" :hide-after="0" placement="right">
      <ElInput
        v-model="config.range"
        style="width: 100%"
        placeholder="格式 1,1-,-10,-"
      />

      <template #content>
        <strong>-</strong>：表示从1到文档页数<br />
        <strong>2-</strong>：表示从2到文档页数<br />
        <strong>-10</strong>：表示从1到10<br />
        <strong>5-5</strong>：两个相同数字组成的范围算单独的数字5
      </template>
    </ElTooltip>
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElInput, ElFormItem, ElTooltip, FormItemRule } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";
import { useViewStore } from "@/browser-window/print/stores/useViewStore";

const { config } = storeToRefs(useConfigStore());
const { pageCount } = storeToRefs(useViewStore());

const rule: FormItemRule = {
  required: true,
  trigger: "change",
  validator(_, value: string, callback) {
    //如果没加载出来就不验证
    if (pageCount.value == 0) {
      return;
    }

    if (value === "") {
      callback("请输入范围");
      return;
    }

    if (!/^(\d*?-\d*?|\d+)([,，](\d*?-\d*?|\d+))*$/.test(value)) {
      callback("格式有误");
      return;
    }

    const pages = value.split(/[,，-]/);

    const res = pages.some(item => {
      if (item == "") {
        return;
      }

      const page = Number(item);
      return page > pageCount.value || page < 1;
    });

    if (res) {
      callback("超出打印范围");
      return;
    }

    callback();
  },
};
</script>

<style scoped lang="scss"></style>
