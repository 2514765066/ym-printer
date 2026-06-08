<template>
  <section
    class="h-8 px-2 flex items-center gap-2 rounded hover:bg-accent dark:hover:bg-accent/50 transition-colors"
    :class="{
      'bg-accent dark:bg-accent/50': active,
    }"
    @click="handleClick"
  >
    <slot></slot>

    <span class="text-sm truncate">{{ label }}</span>
  </section>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const props = defineProps<{
  label: string;
  to?: string;
}>();

const emits = defineEmits<{
  click: [];
}>();

const active = computed(() => {
  if (props.to) {
    return route.path.includes(props.to);
  }

  return false;
});

//处理点击
const handleClick = () => {
  if (props.to) {
    router.push(props.to);
    return;
  }

  emits("click");
};
</script>

<style scoped lang="scss"></style>
