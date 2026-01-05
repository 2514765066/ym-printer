<template>
  <footer class="p-4 flex">
    <ElButtonGroup style="width: 100%">
      <ElButton
        style="width: calc(100% - 32px)"
        type="primary"
        :loading="printing"
        @click="handlePrint"
      >
        {{ printing ? "正在上传" : "开始打印" }}

        <template #loading>
          <Icon icon="loading" width="14" class="rotate mr-2" />
        </template>
      </ElButton>

      <MenuTooltip :data="menu" placement="top">
        <ElButton
          style="width: 32px; height: 32px"
          type="primary"
          :icon="More"
          :loading="printing"
        >
          <template #loading>
            <Icon icon="loading" width="14" class="rotate shrink-0" />
          </template>
        </ElButton>
      </MenuTooltip>
    </ElButtonGroup>
  </footer>
</template>

<script setup lang="ts">
import eventEmitter from "@/hooks/eventEmitter";
import { useRange } from "@print/hooks/useRange";
import { printing, useValidate } from "../index";
import { MenuGroup, MenuTooltip } from "@/components/ui/menu";
import { usePrintStore } from "@print/stores/usePrintStore";
import { useConfigStore } from "@print/stores/useConfigStore";
import { ElButtonGroup, ElButton } from "element-plus";
import { More } from "@element-plus/icons-vue";
import { Icon } from "@iconify/vue";

const { config } = storeToRefs(useConfigStore());
const { printFinish, printAuto, printEven, printOdd } = usePrintStore();
const parserRange = useRange(() => config.value.range || "-");

//开始打印
const handlePrint = useValidate(async () => {
  const range = parserRange();

  await printAuto(range);

  eventEmitter.emit("success:show", "打印完成");
});

//菜单配置
const menu: MenuGroup[] = [
  {
    label: "更多操作",
    children: [
      {
        label: "标记为打印完成",
        icon: "check",
        onSelect: useValidate(() => {
          const range = parserRange();

          printFinish(range);

          eventEmitter.emit("success:show", "已标记为完成");
        }),
      },
    ],
  },
  {
    hidden: () => config.value.mode == "simplex",
    children: [
      {
        label: '打印 "偶数页"',
        icon: "print",
        sub: "#",
        onSelect: useValidate(async () => {
          const range = parserRange();

          await printEven(range);

          eventEmitter.emit("success:show", "打印偶数页完成");
        }),
      },
      {
        label: '打印 "奇数页"',
        icon: "print",
        sub: "#",
        onSelect: useValidate(async () => {
          const range = parserRange();

          await printOdd(range);

          eventEmitter.emit("success:show", "打印奇数页完成");
        }),
      },
    ],
  },
];
</script>

<style scoped lang="scss"></style>
