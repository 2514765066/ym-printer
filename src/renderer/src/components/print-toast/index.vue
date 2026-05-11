<template>
  <section class="flex justify-between items-center">
    <div class="flex-1 flex flex-col truncate" :title="title">
      <span class="text-sm truncate">
        {{ title }}
      </span>

      <span class="text-secondary-foreground">是否继续打印奇数页?</span>
    </div>

    <div class="flex gap-2">
      <Button size="sm" @click="emits('confirm')"> 继续 </Button>

      <Button size="sm" variant="outline" @click="emits('cancel')">
        取消
      </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";

defineProps<{
  title: string;
}>();

const emits = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<style scoped lang="scss"></style>
