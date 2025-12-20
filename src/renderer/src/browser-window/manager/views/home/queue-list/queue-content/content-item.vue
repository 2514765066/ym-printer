<template>
  <section
    class="content-item p-2 flex items-center gap-2 rounded-md"
    :class="{ active }"
    @click="onSingleClick"
    @dblclick="onDoubleClick"
    @contextmenu="handleContextMenu"
  >
    <FileIcon :ext="data.file.ext" />

    <div class="flex flex-col gap-0.5 overflow-hidden">
      <span class="text-sm text-main">
        {{ data.config.remark || data.file.name }}
      </span>

      <div class="flex gap-6">
        <span class="text-main-darken text-xs">
          总份数: {{ data.config.count }}份
        </span>

        <span class="text-main-darken text-xs" v-if="data.config.range">
          打印范围: {{ data.config.range }}
        </span>
      </div>
    </div>

    <span class="ml-auto text-sub text-sm">{{ price }} 元</span>
  </section>
</template>

<script setup lang="ts">
import FileIcon from "@/components/file-icon.vue";
import { QueueItem } from "@type";
import { getPrice } from "@/utils/price";
import useClick from "@manager/hooks/useClick";

const { onDoubleClick, onSingleClick } = useClick({
  click: () => emits("click"),
  dblclick: () => emits("dblclick"),
});

const props = defineProps<{
  data: QueueItem;
  active?: boolean;
}>();

const emits = defineEmits<{
  click: [];
  dblclick: [];
  contextmenu: [e: MouseEvent, data: QueueItem];
}>();

//计算价格
const price = computed(() => {
  return getPrice(props.data.range, props.data.config.count);
});

//处理右键事件
const handleContextMenu = (e: MouseEvent) => {
  emits("contextmenu", e, props.data);
};
</script>

<style scoped lang="scss">
.content-item {
  transition: background-color 0.1s;

  &:not(.active):hover {
    background-color: var(--hover-color);
  }
}

.active {
  background-color: var(--active-bg-color);
}
</style>
