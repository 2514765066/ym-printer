<template>
  <Tip :label="label" placement="right">
    <RouterLink
      class="item w-full flex-center aspect-square rounded-md"
      :class="{ active }"
      :to="to"
    >
      <Icon
        :icon="icon"
        size="26"
        :color="active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.6)'"
      />
    </RouterLink>
  </Tip>
</template>

<script setup lang="ts">
import { Tip } from "@/components/tooltip";
import Icon, { IconName } from "@/components/icon/index.vue";

const { to } = defineProps<{
  label: string;
  to: string;
  icon: IconName;
}>();

const route = useRoute();

const active = computed(() => route.path.includes(to));
</script>

<style scoped lang="scss">
.item {
  transition: background-color 0.1s;

  &:hover {
    background-color: var(--hover-bg-color);
  }
}

.active {
  background-color: var(--hover-bg-color);
}
</style>
