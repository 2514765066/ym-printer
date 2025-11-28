<template>
  <section class="menu rounded-lg" v-click-outside="close" v-if="visible">
    <ElScrollbar
      max-height="40vh"
      :view-style="{ width: `${width}px` }"
      view-class="bg-list rounded-lg"
    >
      <Group v-for="(group, index) of data" :key="index" :data="group" />
    </ElScrollbar>
  </section>
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from "element-plus";
import { ElScrollbar } from "element-plus";
import Group from "./menu-group.vue";
import { MenuProps } from "./index";

const props = withDefaults(
  defineProps<
    MenuProps & {
      customData?: any;
    }
  >(),
  {
    width: 250,
  }
);

const visible = defineModel<boolean>();

const close = () => {
  visible.value = false;
};

provide("close", close);
provide("customData", toRef(props, "customData"));
</script>

<style scoped lang="scss">
.menu {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 14px 28px -6px,
    rgba(0, 0, 0, 0.12) 0px 2px 4px -1px,
    rgba(255, 255, 255, 0.094) 0px 0px 0px 1px;
}
</style>
