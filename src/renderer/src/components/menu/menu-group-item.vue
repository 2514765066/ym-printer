<template>
  <section
    class="h-8 px-3 flex items-center gap-2 rounded-md cursor-pointer hover:bg-hover"
    :class="{ hover: data.hoverColor, disable }"
    @click="handleClick"
    v-if="!hidden"
  >
    <Icon :icon="data.icon" size="18" v-if="data.icon" />

    <span class="text-sm text-main ellipsis">
      {{ data.label }}
    </span>

    <span class="ml-auto text-xs text-main-darken ellipsis">
      {{ data.sub }}
    </span>
  </section>
</template>

<script setup lang="ts">
import Icon from "@/components/icon/index.vue";
import { MenuItem } from "./index";

const { data } = defineProps<{
  data: MenuItem;
}>();

//关闭函数
const close = inject<() => void>("close")!;

//自定义数据
const customData = inject<Ref<any>>("customData")!;

const hidden = computed(() => {
  const value = data.hidden && data.hidden(customData.value);

  if (isRef(value)) {
    return value.value;
  }

  return value;
});

const disable = computed(() => {
  const value = data.disable && data.disable(customData.value);

  if (isRef(value)) {
    return value.value;
  }

  return value;
});

const handleClick = () => {
  close();

  data.onSelect && data.onSelect(customData.value);
};
</script>

<style scoped lang="scss">
.hover {
  &:hover {
    > svg {
      color: v-bind("data.hoverColor ") !important;
    }

    > span {
      color: v-bind("data.hoverColor");
    }
  }
}

.disable {
  opacity: 0.4;
  pointer-events: none;
}
</style>
