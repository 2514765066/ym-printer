<template>
  <section
    class="p-2 flex items-center gap-2 rounded-md hover:bg-hover transition-colors"
    @contextmenu="handleContextmenu"
  >
    <Icon icon="queue" size="24" />

    <span class="text-main text-sm ellipsis">
      {{ data.name }}
    </span>

    <span class="ml-auto shrink-0 text-sub text-sm">
      {{ statusLabel || "未知状态" }}
    </span>
  </section>
</template>

<script setup lang="ts">
import { PrinterTask } from "@type";
import statusMap from "./status-map";
import { Icon } from "@/components/ui/icon";

const props = defineProps<{
  data: PrinterTask;
}>();

const emits = defineEmits<{
  contextmenu: [e: MouseEvent, id: number];
}>();

//状态标题
const statusLabel = computed(() => {
  return props.data.status.map(item => statusMap[item]).join("，");
});

//处理右键
const handleContextmenu = (e: MouseEvent) => {
  emits("contextmenu", e, props.data.id);
};
</script>

<style scoped lang="scss"></style>
