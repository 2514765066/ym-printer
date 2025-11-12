<template>
  <section class="tool-bar p-2 flex items-center relative">
    <span class="text-main text-sm">共{{ pageCount }}页</span>

    <div
      class="flex justify-between items-center absolute left-1/2 -translate-x-1/2"
      style="width: 120px"
    >
      <button
        class="w-8 flex-center aspect-square rounded-md"
        @click="subScale"
      >
        <Icon icon="subtract" size="18" />
      </button>

      <span class="text-main text-sm">{{ scale * dpi }}%</span>

      <button
        class="w-8 flex-center aspect-square rounded-md"
        @click="addScale"
      >
        <Icon icon="add" size="18" />
      </button>
    </div>

    <div class="w-fit ml-auto flex gap-2">
      <button
        class="w-8 flex-center aspect-square rounded-md"
        @click="togglePdfTheme"
      >
        <Icon icon="sun" size="20" v-if="data.pdfTheme == 'light'" />
        <Icon icon="moon" size="20" v-else />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePdfStore } from "@/stores/usePdfStore";
import Icon from "@/components/icon/index.vue";
import { useSettingsStore } from "@/stores/useSettingsStore";

const { scale, pageCount } = storeToRefs(usePdfStore());
const { data } = storeToRefs(useSettingsStore());
const { togglePdfTheme } = useSettingsStore();
const { subScale, addScale, dpi } = usePdfStore();
</script>

<style scoped lang="scss">
.tool-bar {
  grid-area: tool-bar;

  border-bottom: 1px solid var(--border-color);

  button {
    transition: background-color 0.1s;

    &:hover {
      background-color: var(--hover-bg-color);
    }
  }
}
</style>
