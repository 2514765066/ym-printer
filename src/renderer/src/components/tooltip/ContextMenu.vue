<template>
  <section @contextmenu="handleContextMenu">
    <slot></slot>

    <Transition name="fade">
      <div
        class="context-menu fixed z-40 rounded-lg"
        v-if="visible"
        v-click-outside="handleClickOutSide"
        ref="container"
      >
        <BaseMenu :data="data" v-model="visible" :width="width" />
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from "element-plus";
import { BaseMenu, MenuGrounp } from "./BaseMenu";

const props = withDefaults(
  defineProps<{
    width?: number;
    data: MenuGrounp[];
  }>(),
  {
    width: 250,
  }
);

const containerRef = useTemplateRef("container");

//是否显示
const visible = ref(false);

const x = ref(0);

const y = ref(0);

//处理菜单
const handleContextMenu = async (e: MouseEvent) => {
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

//关闭
const handleClickOutSide = () => {
  visible.value = false;
};
</script>

<style scoped lang="scss">
.context-menu {
  top: calc(v-bind("y") * 1px);
  left: calc(v-bind("x") * 1px);

  box-shadow: rgba(0, 0, 0, 0.2) 0px 14px 28px -6px,
    rgba(0, 0, 0, 0.12) 0px 2px 4px -1px,
    rgba(255, 255, 255, 0.094) 0px 0px 0px 1px;
}

/* 进入前 & 离开后：透明 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 进入后 & 离开前：不透明 */
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s linear;
}
</style>
