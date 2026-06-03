<template>
  <section class="flex gap-2">
    <Printer v-model="selectedWorkspace.printer" />

    <Tooltip label="计算价格" side="bottom">
      <Button
        class="ml-auto"
        variant="ghost"
        size="icon"
        @click="setStatus('price')"
      >
        <DollarSignIcon />
      </Button>
    </Tooltip>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { DollarSignIcon } from "lucide-vue-next";
import { setStatus } from "../index";
import Printer from "@/components/printer.vue";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import Tooltip from "@/components/tooltip.vue";

const { selectedWorkspace } = storeToRefs(useWorkspaceStore());
</script>

<style scoped lang="scss"></style>
