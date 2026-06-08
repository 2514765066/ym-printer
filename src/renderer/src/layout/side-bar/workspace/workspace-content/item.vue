<template>
  <ContextMenu>
    <ContextMenuTrigger as-child>
      <section
        class="h-13 px-3 flex flex-col justify-center gap-1 rounded-[6px] hover:bg-accent dark:hover:bg-accent/50 transition-colors"
        :class="{
          'bg-accent dark:bg-accent/50': isSelected,
        }"
        :title="data.name"
        @click="handleClick"
      >
        <span class="text-sm truncate">{{ data.name }}</span>

        <div class="flex items-center gap-1.5">
          <FolderOpenIcon
            class="size-4 text-muted-foreground"
            v-if="isSelected"
          />

          <FolderClosedIcon class="size-4 text-muted-foreground" v-else />

          <span class="text-xs text-muted-foreground truncate"> · </span>

          <span class="text-xs text-muted-foreground truncate">
            {{ docCount }} 个文档
          </span>
        </div>
      </section>
    </ContextMenuTrigger>

    <ContextMenuContent class="min-w-60">
      <ContextMenuItem @click="handleAdd">
        <PlusIcon />

        <span> 添加文档 </span>
      </ContextMenuItem>

      <ContextMenuItem @click="handleEdit">
        <PencilLineIcon />

        <span> 编辑 </span>
      </ContextMenuItem>

      <ContextMenuSeparator />

      <ContextMenuItem variant="destructive" @click="handleRemoveDocs">
        <Trash2Icon />

        <span> 删除 "工作区中所有文档"</span>
      </ContextMenuItem>

      <ContextMenuItem
        :disabled="data.id == 'default'"
        variant="destructive"
        @click="handleRemove"
      >
        <Trash2Icon />

        <span> 删除 "当前工作区"</span>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>

<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Workspace } from "@/stores/useWorkspaceStore";
import {
  PlusIcon,
  FolderClosedIcon,
  FolderOpenIcon,
  PencilLineIcon,
  Trash2Icon,
} from "lucide-vue-next";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import eventEmitter from "@/hooks/eventEmitter";
import { useDocStore } from "@/stores/useDocStore";
import { totalCount } from "@/utils/total";

const { selectedWorkspaceID } = storeToRefs(useWorkspaceStore());
const { selectWorkspace, removeWorkspace } = useWorkspaceStore();
const { docs } = storeToRefs(useDocStore());
const { clearDoc } = useDocStore();

const router = useRouter();
const route = useRoute();

const props = defineProps<{
  data: Workspace;
}>();

const docCount = computed(() => {
  return totalCount(docs.value, item => item.workspaceId === props.data.id);
});

//是否选中
const isSelected = computed(() => {
  return (
    route.path.includes("doc") && selectedWorkspaceID.value == props.data.id
  );
});

//处理点击
const handleClick = () => {
  selectWorkspace(props.data.id);
  router.push("/doc");
};

//处理添加
const handleAdd = () => {
  ipcRenderer.invoke("addDoc", {
    workspaceId: props.data.id,
  });
};

//处理编辑
const handleEdit = () => {
  eventEmitter.emit("dialog-workspace:show", {
    type: "edit",
    data: props.data,
  });
};

//删除工作区中所有文档
const handleRemoveDocs = () => {
  clearDoc(props.data.id);

  eventEmitter.emit("success:show", "已删除全部文档");
};

//处理删除
const handleRemove = () => {
  clearDoc(props.data.id);

  removeWorkspace(props.data.id);

  eventEmitter.emit("success:show", `已删除 "${props.data.name}"`);
};
</script>

<style scoped lang="scss"></style>
