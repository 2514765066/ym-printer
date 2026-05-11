<template>
  <section class="p-2 relative flex items-center gap-2 border-b">
    <span class="text-sm">共{{ selectedDoc.pageCount }}页</span>

    <div class="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
      <Button variant="ghost" size="icon-sm" @click="subScale">
        <Minus />
      </Button>

      <span class="text-sm">{{ scale * dpi }}%</span>

      <Button variant="ghost" size="icon-sm" @click="addScale">
        <Plus />
      </Button>
    </div>

    <Button class="ml-auto" variant="ghost" size="icon-sm" @click="toggleTheme">
      <Moon v-if="theme == 'dark'" />

      <Sun v-else />
    </Button>
  </section>
</template>

<script setup lang="ts">
import { usePdfStore } from "@/stores/usePdfStore";
import { Minus, Moon, Plus, Sun } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { useDocStore } from "@/stores/useDocStore";

const { selectedDoc } = storeToRefs(useDocStore());
const { scale, theme } = storeToRefs(usePdfStore());
const { dpi, subScale, addScale, toggleTheme } = usePdfStore();
</script>

<style scoped lang="scss"></style>
