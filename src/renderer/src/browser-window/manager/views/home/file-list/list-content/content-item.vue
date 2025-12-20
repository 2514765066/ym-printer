<template>
  <Tooltip :label="data.name" placement="right">
    <section
      class="p-2 flex items-center gap-2 rounded-md hover:bg-hover transition-colors"
      :class="{
        'pointer-events-none': loading,
      }"
      @click="emits('click')"
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

        <Icon icon="check" size="24" color="#0CBC4D" v-else-if="printed" />

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
    </section>
  </Tooltip>
</template>

<script setup lang="ts">
import FileIcon from "@/components/file-icon.vue";
import { Icon } from "@/components/ui/icon";
import Tooltip from "@/components/ui/tooltip.vue";
import { FileInfo } from "@type";

const props = defineProps<{
  data: FileInfo;
  printed?: boolean;
}>();

const emits = defineEmits<{
  click: [];
  contextmenu: [e: MouseEvent, data: FileInfo];
}>();

//是否加载中
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

<style scoped lang="scss"></style>
