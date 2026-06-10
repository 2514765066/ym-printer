<template>
  <ContextMenu>
    <ContextMenuTrigger as-child :disabled="status != 'default'">
      <VueDraggable
        class="flex flex-col"
        :animation="200"
        :model-value="filterDocs"
        @update:model-value="handleSort"
        :disabled="status != 'default'"
      >
        <template v-for="(item, index) in filterDocs" :key="item.id">
          <ContentItem
            :data="filterDocs[index]"
            @contextmenu="handleContextmenu(item)"
          />
        </template>
      </VueDraggable>
    </ContextMenuTrigger>

    <ContextMenuContent class="min-w-60">
      <ContextMenuItem @click="handlePrint">
        <PrinterIcon />

        <span> 打印 "当前文档"</span>
      </ContextMenuItem>

      <ContextMenuItem @click="handleOpen">
        <PlayIcon />

        <span> 用默认方式打开 "当前文档"</span>
      </ContextMenuItem>

      <ContextMenuSub>
        <ContextMenuSubTrigger>
          <CornerUpRightIcon class="mr-2" />

          <span> 移动 "当前文档"</span>
        </ContextMenuSubTrigger>

        <ContextMenuSubContent class="min-w-40">
          <ContextMenuRadioGroup v-model="selectedItem!.workspaceId">
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

      <ContextMenuItem variant="destructive" @click="handleRemove">
        <Trash2Icon />

        <span> 删除 "当前文档"</span>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>

<script setup lang="ts">
import ContentItem from "./content-item/index.vue";
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
import { useDocStore } from "@/stores/useDocStore";
import { VueDraggable } from "vue-draggable-plus";
import { status } from "../index";
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

const selectedItem = shallowRef<Doc>();

const handleContextmenu = (item: Doc) => {
  selectedItem.value = item;
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
const handlePrint = (id?: string) => {
  if (status.value == "price") {
    return;
  }

  selectDoc(id ?? selectedItem.value!.id);

  eventEmitter.emit("dialog-print:show");
};

//打开文档
const handleOpen = () => {
  if (!selectedItem.value) {
    return;
  }

  api.startApp(selectedItem.value.path);
};

//删除文档
const handleRemove = () => {
  if (!selectedItem.value) {
    return;
  }

  removeDoc(selectedItem.value.id);

  eventEmitter.emit("success:show", `已删除 "${selectedItem.value.name}"`);
};

provide("handlePrint", handlePrint);
</script>

<style scoped lang="scss"></style>
