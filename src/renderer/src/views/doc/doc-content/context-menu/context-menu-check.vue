<template>
  <ContextMenuContent class="min-w-60">
    <ContextMenuSub>
      <ContextMenuSubTrigger>
        <CornerUpRightIcon class="mr-2" />

        <span> 移动 "选中的所有文档"</span>
      </ContextMenuSubTrigger>

      <ContextMenuSubContent class="min-w-40">
        <ContextMenuRadioGroup
          @update:model-value="val => handleMoveChecked(val as string)"
        >
          <ContextMenuRadioItem
            v-for="item in workspace"
            :key="item.id"
            :value="item.id"
            :disabled="checked.size == 0"
          >
            {{ item.name }}
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuSubContent>
    </ContextMenuSub>

    <ContextMenuSeparator />

    <ContextMenuItem
      variant="destructive"
      :disabled="checked.size == 0"
      @click="handleRemoveChecked"
    >
      <Trash2Icon />

      <span> 删除 "选中的所有文档"</span>
    </ContextMenuItem>
  </ContextMenuContent>
</template>

<script setup lang="ts">
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from "@/components/ui/context-menu";
import eventEmitter from "@/hooks/eventEmitter";
import { useDocStore } from "@/stores/useDocStore";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { CornerUpRightIcon, Trash2Icon } from "lucide-vue-next";
import { cancelCheckAll, checked } from "../../check";
import { setStatus } from "../../index";

const { workspace } = storeToRefs(useWorkspaceStore());
const { removeDoc, setDocWorkspaceId } = useDocStore();

//移动选中的所有文档
const handleMoveChecked = (workspaceId: string) => {
  const ids = Array.from(checked.value);

  setDocWorkspaceId(ids, workspaceId);

  setStatus();
  cancelCheckAll();
};

//删除选中的文档
const handleRemoveChecked = () => {
  const ids = Array.from(checked.value);

  removeDoc(ids);

  eventEmitter.emit("success:show", `已删除 "${ids.length} 个文档"`);

  setStatus();
  cancelCheckAll();
};
</script>

<style scoped lang="scss"></style>
