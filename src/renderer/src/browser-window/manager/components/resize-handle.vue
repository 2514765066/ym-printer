<template>
  <section
    class="w-1 hover:bg-primary hover:cursor-ew-resize"
    :class="{ active: isActive }"
    @mousedown="handleMousedown"
    @mouseup="handleMouseup"
  ></section>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    leftPadding?: number;
    rightPadding?: number;
    containerRef: HTMLElement | null;
  }>(),
  {
    leftPadding: 20,
    rightPadding: 20,
  }
);

//宽度
const model = defineModel<number>();

//是否开始拖拽
const isActive = ref(false);

//鼠标移动
const handleMousemove = (e: MouseEvent) => {
  if (!props.containerRef) {
    return;
  }

  const rect = props.containerRef.getBoundingClientRect();

  const offsetX = e.clientX - rect.left;

  model.value = Math.max(
    props.leftPadding,
    Math.min(offsetX, rect.width - props.rightPadding)
  );
};

//鼠标按下
const handleMousedown = () => {
  if (!props.containerRef) {
    return;
  }

  isActive.value = true;
  document.body.classList.add("is-resizing");

  props.containerRef.addEventListener("mousemove", handleMousemove);
  props.containerRef.addEventListener("mouseup", handleMouseup);
};

//鼠标松开
const handleMouseup = () => {
  if (!props.containerRef) {
    return;
  }

  isActive.value = false;
  document.body.classList.remove("is-resizing");

  props.containerRef.removeEventListener("mousemove", handleMousemove);
  props.containerRef.removeEventListener("mouseup", handleMouseup);
};
</script>

<style scoped lang="scss">
.active {
  background-color: var(--primary-color);
}
</style>
