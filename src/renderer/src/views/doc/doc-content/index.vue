<template>
  <VueDraggable
    class="flex flex-col gap-2"
    :animation="200"
    v-model="docs"
    :disabled="status != 'default'"
  >
    <template v-for="(item, index) in docs" :key="item.id">
      <ContextMenu>
        <ContextMenuTrigger as-child>
          <component
            :is="map[item.status]"
            @print="handlePrint"
            v-model="docs[index]"
          />
        </ContextMenuTrigger>

        <ContextMenuContent class="w-52">
          <ContextMenuItem @select="handlePrint(item.id)">
            <PrinterIcon />

            <span> 打印 "当前文档"</span>
          </ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuItem
            variant="destructive"
            @select="handleRemove(item.id)"
          >
            <Trash2Icon class="stroke-destructive-foreground!" />

            <span> 删除 "当前文档"</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </template>
  </VueDraggable>
</template>

<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Item from "./item.vue";
import ItemPrinting from "./item-printing.vue";
import ItemPrinted from "./item-printed.vue";
import { useDocStore } from "@/stores/useDocStore";
import ItemLoading from "./item-loading.vue";
import { VueDraggable } from "vue-draggable-plus";
import { status } from "..";
import { PrinterIcon, Trash2Icon } from "lucide-vue-next";
import eventEmitter from "@/hooks/eventEmitter";

const { docs } = storeToRefs(useDocStore());
const { selectDoc, removeDoc } = useDocStore();

const map = {
  loading: ItemLoading,
  init: Item,
  printing: ItemPrinting,
  printed: ItemPrinted,
};

//打印文档
const handlePrint = (id: string) => {
  if (status.value == "price") {
    return;
  }

  selectDoc(id);

  eventEmitter.emit("dialog-print:show");
};

//删除文档
const handleRemove = (id: string) => {
  removeDoc(id);

  eventEmitter.emit("success:show", "已删除文档");
};
</script>

<style scoped lang="scss"></style>
