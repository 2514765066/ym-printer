<template>
  <li
    class="p-2 flex items-center gap-2 rounded-md"
    :class="{
      active,
      'pointer-events-none': loading,
    }"
    :title="`${data.name}\r\n${data.path}`"
    @click="onSingleClick"
    @dblclick="onDoubleClick"
    @contextmenu="handleContextMenu"
  >
    <div class="h-8 flex-center aspect-square">
      <Icon
        icon="loading"
        class="rotate"
        size="32"
        color="rgba(255,255,255,0.6)"
        v-if="loading"
      />

      <Icon icon="check" size="24" color="0CBC4D" v-else-if="printed" />

      <FileIcon class="h-full" :ext="data.ext" v-else />
    </div>

    <div class="flex flex-col gap-0.5 overflow-hidden">
      <span class="text-sm text-main ellipsis">
        {{ data.name }}
      </span>

      <span class="text-xs text-main-darken ellipsis">
        {{ data.path }}
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
import FileIcon from "@/components/file-icon.vue";
import { Icon } from "@/components/ui/icon";
import { FileInfo } from "@type";
import useClick from "@manager/hooks/useClick";

const { onDoubleClick, onSingleClick } = useClick({
  click: () => emits("click"),
  dblclick: () => emits("dblclick"),
});

const props = defineProps<{
  data: FileInfo;
  printed?: boolean;
  active?: boolean;
}>();

const emits = defineEmits<{
  click: [];
  dblclick: [];
  contextmenu: [e: MouseEvent, data: FileInfo];
}>();

const loading = ref(true);

//处理右键事件
const handleContextMenu = (e: MouseEvent) => {
  emits("contextmenu", e, props.data);
};

onMounted(async () => {
  await ipcRenderer.invoke("parserFile", toRaw(props.data));

  loading.value = false;
});
</script>

<style scoped lang="scss">
li {
  transition: background-color 0.1s;

  &:not(.active):hover {
    background-color: var(--hover-bg-color);
  }
}

.active {
  background-color: var(--active-bg-color);
}
</style>
