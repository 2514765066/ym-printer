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
      </ElButton>

      <Menu :data="menu" placement="top">
        <ElButton
          style="width: 32px; height: 32px"
          type="primary"
          :icon="ArrowUp"
          :loading="printing"
          @click="handleMore"
        />
      </Menu>
    </ElButtonGroup>
  </footer>
</template>

<script setup lang="ts">
import { ElButton, ElButtonGroup } from "element-plus";
import { ArrowUp } from "@element-plus/icons-vue";
import { MenuGroup, Menu } from "@/components/menu";
import { printDialog } from "@/components/notification";
import eventEmitter from "@/hooks/eventEmitter";
import { useConfigStore } from "@print/stores/useConfigStore";
import { useRange, padRange } from "@print/hooks/useRange";
import { useViewStore } from "@print/stores/useViewStore";
import { validate } from "../index";
import { printFinishKey } from "@print/keys";

const { pageCount } = storeToRefs(useViewStore());
const { config } = storeToRefs(useConfigStore());
const { printEven, printOdd, isSimplex } = useConfigStore();
const { range, parser } = useRange();

const printFinish = inject(printFinishKey)!;

//是否在打印
const printing = ref(false);

//解析范围
const parserRange = () => {
  const formatRange = padRange(config.value.range, pageCount.value);

  parser(formatRange);
};

const usePrint = (cb: () => void | Promise<void>) => {
  return async () => {
    const valid = await validate();

    if (!valid) {
      return;
    }

    printing.value = true;

    await cb();

    printing.value = false;
  };
};

//更多
const handleMore = usePrint(parserRange);

//开始打印
const handlePrint = usePrint(async () => {
  parserRange();

  //全是单页
  if (isSimplex(range.value)) {
    await printOdd(range.value);

    printFinish(range.value);

    eventEmitter.emit("success:show", "打印完成");
    return;
  }

  //需要双打
  await printEven(range.value);

  //判断是否要打奇数页
  const result = await printDialog();

  if (!result) {
    return;
  }

  await printOdd(range.value);

  printFinish(range.value);

  eventEmitter.emit("success:show", "打印完成");
});

//菜单配置
const menu: MenuGroup[] = [
  {
    label: "更多操作",
    children: [
      {
        hidden: () => isSimplex(range.value),
        label: "打印偶数页",
        icon: "print",
        sub: "#",
        onSelect: usePrint(async () => {
          await printEven(range.value);

          eventEmitter.emit("success:show", "打印完成");
        }),
      },
      {
        hidden: () => isSimplex(range.value),
        label: "打印奇数页",
        icon: "print",
        sub: "#",
        onSelect: usePrint(async () => {
          await printOdd(range.value);

          eventEmitter.emit("success:show", "打印完成");
        }),
      },
      {
        hidden: () => !isSimplex(range.value),
        label: "打印单页",
        icon: "print",
        sub: "#",
        onSelect: usePrint(async () => {
          await printOdd(range.value);

          eventEmitter.emit("success:show", "打印完成");
        }),
      },
    ],
  },
];
</script>

<style scoped lang="scss"></style>
