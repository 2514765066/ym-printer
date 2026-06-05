<template>
  <Sheet v-model:open="open">
    <SheetContent
      side="bottom"
      class="h-[calc(100vh-44px)] p-0!"
      @open-auto-focus.prevent
    >
      <VisuallyHidden as-child>
        <SheetTitle>
          <SheetDescription />
        </SheetTitle>
      </VisuallyHidden>

      <div class="dialog-print wh-full grid overflow-hidden">
        <TitleBar class="col-start-1 col-end-3 row-start-1 row-end-2" />

        <SideBar class="col-start-1 col-end-2 row-start-2 row-end-3" />

        <PreivewPdf class="col-start-2 col-end-3 row-start-2 row-end-3" />
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import TitleBar from "./title-bar/index.vue";
import SideBar from "./side-bar/index.vue";
import PreivewPdf from "@/components/preview-pdf/index.vue";
import { VisuallyHidden } from "reka-ui";
import { open } from "./index";
</script>

<style scoped lang="scss">
.dialog-print {
  grid-template-columns: 260px calc(100% - 260px);
  grid-template-rows: 44px calc(100% - 44px);
}
</style>
