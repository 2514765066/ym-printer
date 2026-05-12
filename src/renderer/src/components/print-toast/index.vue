<template>
  <section class="flex justify-between items-center">
    <FileIcon class="mr-4" :ext="data.ext" />

    <div
      class="flex-1 flex flex-col truncate"
      :title="data.remark || data.name"
    >
      <span class="text-sm truncate">
        {{ data.remark || data.name }}
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
import FileIcon from "@/components/file-icon.vue";
import { Doc } from "@type";

defineProps<{
  data: Doc;
}>();

const emits = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<style scoped lang="scss"></style>
