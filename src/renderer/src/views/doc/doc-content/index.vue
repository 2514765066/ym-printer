<template>
  <VueDraggable
    class="flex flex-col"
    :animation="200"
    :model-value="filterDocs"
    @update:model-value="handleSort"
    :disabled="status != 'default'"
  >
    <template v-for="(item, index) in filterDocs" :key="item.id">
      <ContextMenu>
        <ContextMenuTrigger as-child>
          <component
            :is="map[item.status]"
            @print="handlePrint"
            :data="filterDocs[index]"
          />
        </ContextMenuTrigger>

        <ContextMenuContent class="min-w-60">
          <ContextMenuItem
            :disabled="status != 'default'"
            @select="handlePrint(item.id)"
          >
            <PrinterIcon />

            <span> 打印 "当前文档"</span>
          </ContextMenuItem>

          <ContextMenuItem
            :disabled="status != 'default'"
            @select="handleOpen(item.path)"
          >
            <PlayIcon />

            <span> 用默认方式打开 "当前文档"</span>
          </ContextMenuItem>

          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <CornerUpRightIcon class="mr-2" />

              <span> 移动 "当前文档"</span>
            </ContextMenuSubTrigger>

            <ContextMenuSubContent class="min-w-40">
              <ContextMenuRadioGroup v-model="item.workspaceId">
                <ContextMenuRadioItem
                  v-for="item in workspace"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>

          <ContextMenuSeparator />

          <ContextMenuItem
            variant="destructive"
            @select="handleRemove(item.id)"
          >
            <Trash2Icon />

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
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from "@/components/ui/context-menu";
import Item from "./item.vue";
import ItemPrinting from "./item-printing.vue";
import ItemPrinted from "./item-printed.vue";
import { useDocStore } from "@/stores/useDocStore";
import ItemLoading from "./item-loading.vue";
import { VueDraggable } from "vue-draggable-plus";
import { status } from "..";
import {
  CornerUpRightIcon,
  PrinterIcon,
  Trash2Icon,
  PlayIcon,
} from "lucide-vue-next";
import eventEmitter from "@/hooks/eventEmitter";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { Doc } from "@type";

const { docs } = storeToRefs(useDocStore());
const { selectDoc, removeDoc } = useDocStore();
const { workspace, selectedWorkspaceID } = storeToRefs(useWorkspaceStore());

const map = {
  loading: ItemLoading,
  init: Item,
  upload: ItemPrinting,
  printing: ItemPrinting,
  printed: ItemPrinted,
};

const filterDocs = computed(() => {
  return docs.value.filter(
    item => item.workspaceId == selectedWorkspaceID.value,
  );
});

//排序
const handleSort = (data: Doc[]) => {
  const order = docs.value.filter(
    item => item.workspaceId != selectedWorkspaceID.value,
  );

  docs.value = [...order, ...data];
};

//打印文档
const handlePrint = (id: string) => {
  if (status.value == "price") {
    return;
  }

  selectDoc(id);

  eventEmitter.emit("dialog-print:show");
};

//打开文档
const handleOpen = (path: string) => {
  api.startApp(path);
};

//删除文档
const handleRemove = (id: string) => {
  removeDoc(id);

  eventEmitter.emit("success:show", `已删除文档`);
};
</script>

<style scoped lang="scss"></style>
