<template>
  <Tooltip :label="label" side="right">
    <Button
      :class="{
        'bg-accent dark:bg-accent/50': active,
      }"
      variant="ghost"
      size="icon"
      @click="handleClick"
    >
      <slot></slot>
    </Button>
  </Tooltip>
</template>

<script setup lang="ts">
import Tooltip from "@/components/tooltip.vue";
import { Button } from "@/components/ui/button";

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
