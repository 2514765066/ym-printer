<template>
  <section class="pl-3 pr-2 flex items-center">
    <span class="text-xs text-muted-foreground">工作空间</span>

    <Button class="ml-auto" variant="outline" size="xs" @click="handleAdd">
      <PlusIcon class="size-4" />

      新空间
    </Button>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import eventEmitter from "@/hooks/eventEmitter";
import { PlusIcon } from "lucide-vue-next";

const handleAdd = () => {
  eventEmitter.emit("dialog-workspace-add:show");
};
</script>

<style scoped lang="scss"></style>
