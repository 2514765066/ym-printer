<template>
  <ContextMenu :data="menu">
    <li class="p-2 flex items-center gap-2 rounded-md">
      <div class="h-8 flex-center aspect-square">
        <Icon
          icon="loading"
          class="rotate"
          size="28"
          color="rgba(255,255,255,0.6)"
          v-if="printing"
        />

        <ExtIcon class="h-full" :ext="data.info.ext" v-else />
      </div>

      <div class="flex flex-col gap-0.5 overflow-hidden">
        <span class="text-sm text-main ellipsis">
          {{ data.config.remarks || data.info.name }}
        </span>

        <div class="flex gap-6">
          <span class="text-main-darken text-xs">
            总份数: {{ data.config.count }}份
          </span>

          <span
            class="text-main-darken text-xs"
            v-if="data.config.simplexRange"
          >
            单打范围: {{ data.config.simplexRange }}
          </span>

          <span
            class="text-main-darken text-xs"
            v-if="data.config.simplexRange"
          >
            单打份数: {{ data.config.simplexCount }}份
          </span>

          <span class="text-main-darken text-xs" v-if="data.config.duplexRange">
            双打范围: {{ data.config.duplexRange }}
          </span>
        </div>
      </div>

      <span class="ml-auto text-sub text-sm">{{ price }} 元</span>
    </li>
  </ContextMenu>
</template>

<script setup lang="ts">
import ExtIcon from "@/components/icon/ext-icon.vue";
import { ContextMenu } from "@/components/tooltip";
import { MenuGrounp } from "@/components/tooltip/BaseMenu";
import Icon from "@/components/icon/index.vue";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { QueueItem, useQueueStore } from "@/stores/useQueueStore";
import eventEmitter from "@/hooks/eventEmitter";
import { printTip } from "@/components/notification";

const settingsStore = useSettingsStore();
const { removeQueue, startPrint, addFinishQueue } = useQueueStore();

const props = defineProps<{
  data: QueueItem;
}>();

//是否正在打印
const printing = ref(false);

const menu = computed(
  () =>
    [
      {
        title: "更多操作",
        children: [
          {
            title: "开始打印",
            icon: "play",
            disable: printing.value,
            async onSelect() {
              printing.value = true;

              const next = await startPrint(props.data.id);

              if (!next) {
                printing.value = false;

                eventEmitter.emit("success:show", "打印完成");
                return;
              }

              printTip({
                onConfirm: async () => {
                  await next();

                  printing.value = false;

                  eventEmitter.emit("success:show", "打印完成");
                },
                onCancel: () => {
                  printing.value = false;
                },
              });
            },
          },
          {
            title: "取消打印",
            icon: "remove",
            hoverColor: "#f87171",
            onSelect() {
              removeQueue(props.data.id);

              eventEmitter.emit("success:show", "已取消打印");
            },
          },
        ],
      },
      {
        children: [
          {
            title: "标记为完成打印",
            icon: "mark",
            onSelect() {
              addFinishQueue(props.data);
            },
          },
        ],
      },
      {
        children: [
          {
            hidden: props.data.duplexRange.length == 0,
            title: "打印偶数页",
            icon: "print",
            sub: "#",
            disable: printing.value,
            async onSelect() {
              printing.value = true;

              await props.data.printEven();

              printing.value = false;
            },
          },
          {
            hidden: props.data.duplexRange.length == 0,
            title: "打印奇数页",
            icon: "print",
            sub: "#",
            disable: printing.value,
            async onSelect() {
              printing.value = true;

              await props.data.printOdd();

              printing.value = false;
            },
          },
          {
            hidden: props.data.simplexRange.length == 0,
            title: "打印单页",
            icon: "print",
            sub: "#",
            disable: printing.value,
            async onSelect() {
              printing.value = true;

              await props.data.printSimplex();

              printing.value = false;
            },
          },
          {
            hidden:
              props.data.duplexRange.length == 0 ||
              props.data.simplexRange.length == 0,
            title: "打印奇数页和单页",
            icon: "print",
            sub: "#",
            disable: printing.value,
            async onSelect() {
              printing.value = true;

              await props.data.printOdd(true);

              printing.value = false;
            },
          },
        ],
      },
    ] as MenuGrounp[]
);

//计算价格
const price = computed(() => {
  return props.data.getPrice(
    settingsStore.data.simplexPrice,
    settingsStore.data.duplexPrice
  );
});
</script>

<style scoped lang="scss">
li {
  transition: background-color 0.1s;

  &:hover {
    background-color: var(--hover-bg-color);
  }
}
</style>
