<template>
  <section>
    <div class="flex-center rounded-md aspect-square">
      <span class="font-bold">{{ info.label }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { extMap } from "./index";

const props = withDefaults(
  defineProps<{
    ext?: string;
    size?: number;
  }>(),
  {
    size: 32,
  }
);

const ratio = computed(() => props.size / 32);

const info = computed(
  () => extMap[(props.ext as keyof typeof extMap) || "pdf"]
);
</script>

<style scoped lang="scss">
section {
  width: calc(v-bind("ratio") * 32px);
  height: calc(v-bind("ratio") * 32px);

  > div {
    width: 32px;
    background-color: v-bind("info.color");
    transform-origin: left top;
    transform: scale(v-bind("ratio"));

    > span {
      font-size: calc(v-bind("info.fontSize") * 1px);
    }
  }
}
</style>
