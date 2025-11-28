<template>
  <li
    class="p-2 flex items-center gap-2 rounded-md"
    :class="{
      printed,
      'pointer-events-none': loading,
    }"
    :title="`${data.name}\r\n${data.path}`"
    @click="emits('click')"
    @contextmenu="handleContextMenu"
  >
    <div class="h-8 flex-center aspect-square">
      <Icon
        icon="loading"
        class="rotate"
        size="28"
        color="rgba(255,255,255,0.6)"
        v-if="loading"
      />

      <ExtIcon class="h-full" :ext="data.ext" v-else />
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
import ExtIcon from "@/components/icon/ext-icon.vue";
import Icon from "@/components/icon/index.vue";

import { FileInfo } from "@type";

const props = defineProps<{
  data: FileInfo;
  printed?: boolean;
}>();

const emits = defineEmits<{
  click: [];
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

  &:hover {
    background-color: var(--hover-bg-color);
  }
}

.printed {
  * {
    opacity: 0.6;
  }
}
</style>
