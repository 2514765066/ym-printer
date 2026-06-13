<template>
  <ContextMenu>
    <ContextMenuTrigger as-child :disabled="status == 'price'">
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

    <component
      :is="contextmeunMap[status]"
      :data="selectedItem"
      v-if="selectedItem"
    />
  </ContextMenu>
</template>

<script setup lang="ts">
import ContentItem from "./content-item/index.vue";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import { useDocStore } from "@/stores/useDocStore";
import { VueDraggable } from "vue-draggable-plus";
import { status } from "../index";
import eventEmitter from "@/hooks/eventEmitter";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { Doc } from "@type";
import ContextMenuDefault from "./context-menu/context-menu-default.vue";
import ContextMenuCheck from "./context-menu/context-menu-check.vue";

const contextmeunMap = {
  default: ContextMenuDefault,
  price: ContextMenuDefault,
  check: ContextMenuCheck,
};

const { docs } = storeToRefs(useDocStore());
const { selectDoc } = useDocStore();
const { selectedWorkspaceID } = storeToRefs(useWorkspaceStore());

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
const handlePrint = (id: string) => {
  if (status.value != "default") {
    return;
  }

  selectDoc(id);

  eventEmitter.emit("dialog-print:show");
};

provide("handlePrint", handlePrint);
</script>

<style scoped lang="scss"></style>
