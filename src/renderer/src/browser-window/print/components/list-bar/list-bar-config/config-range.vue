<template>
  <ElFormItem label="打印范围" label-position="top" :rules="rule" prop="range">
    <Tooltip :label="label" trigger="focus" placement="right">
      <ElInput
        v-model="config.range"
        style="width: 100%"
        placeholder="格式 1,1-,-10,-"
      />
    </Tooltip>
  </ElFormItem>
</template>

<script setup lang="ts">
import Tooltip from "@/components/ui/tooltip.vue";
import { ElInput, ElFormItem, FormItemRule } from "element-plus";
import { useConfigStore } from "@print/stores/useConfigStore";
import { useViewStore } from "@/browser-window/print/stores/useViewStore";

const { config } = storeToRefs(useConfigStore());
const { pageCount } = storeToRefs(useViewStore());

const label = `-：表示从1到文档页数
2-：表示从2到文档页数
-10：表示从1到10
5-5：两个相同数字组成的范围算单独的数字5`;

const rule: FormItemRule = {
  trigger: "change",
  validator(_, value: string, callback) {
    //如果没加载出来就不验证
    if (pageCount.value == 0) {
      return;
    }

    if (value === "") {
      callback();
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
