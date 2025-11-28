<template>
  <section
    class="tool-bar p-2 flex items-center relative border-b border-border"
  >
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
        @click="toggleTheme"
      >
        <Icon icon="moon" size="20" v-if="dark" />

        <Icon icon="sun" size="20" v-else />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useViewStore } from "@print/stores/useViewStore";
import Icon from "@/components/icon/index.vue";

const { scale, pageCount, dark } = storeToRefs(useViewStore());
const { dpi, subScale, addScale, toggleTheme } = useViewStore();
</script>

<style scoped lang="scss">
.tool-bar {
  grid-area: tool-bar;

  button {
    transition: background-color 0.1s;

    &:hover {
      background-color: var(--hover-bg-color);
    }
  }
}
</style>
