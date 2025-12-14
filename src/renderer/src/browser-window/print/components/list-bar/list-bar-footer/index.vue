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
          :icon="More"
          :loading="printing"
          @click="parserRange"
        />
      </Menu>
    </ElButtonGroup>
  </footer>
</template>

<script setup lang="ts">
import { ElButton, ElButtonGroup } from "element-plus";
import { More } from "@element-plus/icons-vue";
import { MenuGroup, Menu } from "@/components/ui/menu";
import { printDialog } from "@/components/notification";
import eventEmitter from "@/hooks/eventEmitter";
import { useConfigStore } from "@print/stores/useConfigStore";
import { useRange } from "@print/hooks/useRange";
import { validate } from "../index";
import { printFinishKey } from "@print/keys";

const { config } = storeToRefs(useConfigStore());
const { printEven, printOdd, isSimplex } = useConfigStore();
const { range, parser } = useRange();

const printFinish = inject(printFinishKey)!;

//是否在打印
const printing = ref(false);

//解析范围
const parserRange = () => {
  parser(config.value.range || "-", config.value.mode);
};

const usePrint = (cb: () => void | Promise<void>) => {
  return async () => {
    const valid = await validate();

    if (!valid) {
      return;
    }

    printing.value = true;

    try {
      await cb();
    } catch {
      eventEmitter.emit("error:show", "打印失败");
    } finally {
      printing.value = false;
    }
  };
};

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
        label: "标记为打印完成",
        icon: "queue",
        onSelect: usePrint(() => {
          printFinish(range.value);

          eventEmitter.emit("success:show", "添加完成");
        }),
      },
    ],
  },
  {
    children: [
      {
        label: "打印偶数页",
        icon: "print",
        sub: "#",
        hidden: () => isSimplex(range.value),
        onSelect: usePrint(async () => {
          await printEven(range.value);

          eventEmitter.emit("success:show", "打印完成");
        }),
      },
      {
        label: "打印奇数页",
        icon: "print",
        sub: "#",
        hidden: () => isSimplex(range.value),
        onSelect: usePrint(async () => {
          await printOdd(range.value);

          eventEmitter.emit("success:show", "打印完成");
        }),
      },
      {
        label: "打印单页",
        icon: "print",
        sub: "#",
        hidden: () => !isSimplex(range.value),
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
