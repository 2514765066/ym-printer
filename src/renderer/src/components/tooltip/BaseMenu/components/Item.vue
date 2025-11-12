<template>
  <section
    v-if="!data.hidden"
    class="menu-item flex items-center rounded-md cursor-pointer px-3 gap-1"
    :class="{ hover: data.hoverColor, disable: data.disable }"
    @click="handleClick"
  >
    <div class="flex-center mr-1.5" v-if="data.icon">
      <Icon :icon="data.icon" size="18" color="#ffffffcf"></Icon>
    </div>

    <span
      class="text-sm text-main mr-auto whitespace-nowrap text-ellipsis overflow-hidden"
      v-if="data.title"
    >
      {{ data.title }}
    </span>

    <span
      class="text-xs text-main-darken whitespace-nowrap text-ellipsis overflow-hidden"
      v-if="data.sub"
    >
      {{ data.sub }}
    </span>
  </section>
</template>

<script setup lang="ts">
import Icon from "@/components/icon/index.vue";
import { MenuItem } from "../type";

const props = defineProps<{
  data: MenuItem;
}>();

const emits = defineEmits<{
  click: [];
}>();

const handleClick = () => {
  emits("click");
  if (props.data.onSelect) {
    props.data.onSelect(props.data);
  }
};
</script>

<style scoped lang="scss">
.menu-item {
  height: 32px;

  transition: 0.1s;

  &:hover {
    background-color: var(--hover-bg-color);
  }
}

.hover {
  &:hover {
    > div {
      > svg {
        color: v-bind("data.hoverColor ") !important;
      }
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
