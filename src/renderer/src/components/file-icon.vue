<template>
  <section>
    <div class="flex-center rounded-md aspect-square">
      <span class="font-bold">{{ info.label }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    ext?: string;
    size?: number | string;
  }>(),
  {
    size: 32,
  }
);

const map = {
  pdf: {
    label: "P",
    color: "#E50012",
    fontSize: 18,
  },
  wps: {
    label: "W",
    color: "#0a57bd",
    fontSize: 16,
  },
  doc: {
    label: "W",
    color: "#0a57bd",
    fontSize: 16,
  },
  docx: {
    label: "W",
    color: "#0a57bd",
    fontSize: 16,
  },
};

const ratio = computed(() => Number(props.size) / 32);

const info = computed(() => map[(props.ext as keyof typeof map) || "pdf"]);
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
