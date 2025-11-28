<template>
  <Teleport to="body">
    <div class="context-menu fixed z-40" ref="container">
      <BaseMenu
        :width="width"
        :data="data"
        v-model="visible"
        :customData="customData"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { MenuProps } from "./index";
import BaseMenu from "./index.vue";

const props = withDefaults(defineProps<MenuProps>(), {
  width: 250,
});

const containerRef = useTemplateRef("container");

//是否显示
const visible = ref(false);

const x = ref(0);

const y = ref(0);

const customData = ref();

//处理菜单
const handleContextMenu = async (e: MouseEvent, data?: any) => {
  customData.value = data;

  if (e.clientX + props.width > window.innerWidth) {
    x.value = e.clientX - props.width;
  } else {
    x.value = e.clientX;
  }

  visible.value = true;

  await nextTick();

  if (e.clientY + containerRef.value!.clientHeight > window.innerHeight) {
    y.value = e.clientY - containerRef.value!.clientHeight;
  } else {
    y.value = e.clientY;
  }
};

defineExpose({
  open: handleContextMenu,
});
</script>

<style scoped lang="scss">
.context-menu {
  top: calc(v-bind("y") * 1px);
  left: calc(v-bind("x") * 1px);
}
</style>
