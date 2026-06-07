<template>
  <section class="pl-3 pr-2 flex items-center gap-2">
    <FileIcon :ext="selectedDoc?.ext" size="24" />

    <span class="text-sm"> {{ selectedDoc?.name }}</span>

    <Tooltip label="切换文档主题">
      <Button
        class="ml-auto text-muted-foreground"
        variant="ghost"
        size="icon-sm"
        @click="toggleTheme"
      >
        <MoonIcon v-if="theme == 'dark'" />

        <SunIcon v-else />
      </Button>
    </Tooltip>

    <Tooltip label="关闭">
      <SheetClose>
        <Button
          class="ml-auto text-muted-foreground"
          variant="ghost"
          size="icon-sm"
        >
          <XIcon class="size-5.5" />
        </Button>
      </SheetClose>
    </Tooltip>
  </section>
</template>

<script setup lang="ts">
import { SheetClose } from "@/components/ui/sheet";
import FileIcon from "@/components/file-icon.vue";
import { useDocStore } from "@/stores/useDocStore";
import { Button } from "@/components/ui/button";
import { usePdfStore } from "@/stores/usePdfStore";
import { MoonIcon, SunIcon, XIcon } from "lucide-vue-next";
import Tooltip from "@/components/tooltip.vue";

const { selectedDoc } = storeToRefs(useDocStore());
const { theme } = storeToRefs(usePdfStore());
const { toggleTheme } = usePdfStore();
</script>

<style scoped lang="scss"></style>
