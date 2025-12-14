<template>
  <Tooltip :label="label" placement="right">
    <RouterLink
      class="flex-center aspect-square rounded-md transition-colors hover:bg-hover"
      :class="{ active }"
      :to="to"
    >
      <Icon
        :icon="icon"
        size="26"
        :color="active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.6)'"
      />
    </RouterLink>
  </Tooltip>
</template>

<script setup lang="ts">
import { Icon, IconName } from "@/components/ui/icon";
import Tooltip from "@/components/ui/tooltip.vue";

const { to } = defineProps<{
  label: string;
  to: string;
  icon: IconName;
}>();

const route = useRoute();

const active = computed(() => route.path.includes(to));
</script>

<style scoped lang="scss">
.active {
  background-color: var(--hover-color);
}
</style>
