<template>
  <Tooltip :label="description" side="right">
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
  </Tooltip>
</template>

<script setup lang="ts">
import Tooltip from "@/components/tooltip.vue";

const router = useRouter();
const route = useRoute();

const props = defineProps<{
  label: string;
  to?: string;
  description?: string;
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
