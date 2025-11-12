<template>
  <ElScrollbar max-height="40vh" view-class="base-menu rounded-lg">
    <Group v-for="(group, index) of data" :key="index" :data="group">
      <Item
        v-for="(item, index) of group.children"
        :key="index"
        :data="item"
        @click="handleClose"
      />
    </Group>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import Group from "./components/Group.vue";
import Item from "./components/Item.vue";
import { MenuGrounp } from "./type";

withDefaults(
  defineProps<{
    data: MenuGrounp[];
    width?: number;
  }>(),
  {
    width: 250,
  }
);

const visible = defineModel({
  default: false,
});

const handleClose = () => {
  visible.value = false;
};
</script>

<style lang="scss">
.base-menu {
  width: calc(v-bind("$props.width") * 1px);

  background-color: #202020;
}
</style>
