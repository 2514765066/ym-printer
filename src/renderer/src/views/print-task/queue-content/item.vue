<template>
  <Item class="dark:hover:bg-accent/30" size="sm" variant="outline">
    <ItemMedia variant="icon">
      <FileTextIcon />
    </ItemMedia>

    <ItemContent>
      <ItemTitle> {{ data.name }}</ItemTitle>

      <ItemDescription>
        {{ statusLabel || "未知状态" }}
      </ItemDescription>
    </ItemContent>

    <ItemActions>
      <Tooltip label="删除当前打印任务">
        <Button variant="outline" size="icon" @click="handleRemove">
          <Trash2Icon />
        </Button>
      </Tooltip>
    </ItemActions>
  </Item>
</template>

<script setup lang="ts">
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemActions,
} from "@/components/ui/item";
import { PrinterTask } from "@type";
import { printStatusMap } from "@/map/index";
import { FileTextIcon, Trash2Icon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { usePrinterTaskStore } from "@/stores/usePrinterTaskStore";
import eventEmitter from "@/hooks/eventEmitter";
import Tooltip from "@/components/tooltip.vue";

const { removePrinterTask } = usePrinterTaskStore();

const props = defineProps<{
  data: PrinterTask;
}>();

//状态标题
const statusLabel = computed(() => {
  return props.data.status.map(item => printStatusMap[item]).join("，");
});

//删除
const handleRemove = async () => {
  await removePrinterTask(props.data.id);

  eventEmitter.emit("success:show", "已删除当前任务");
};
</script>

<style scoped lang="scss"></style>
