<template>
  <Dialog v-model:open="open">
    <DialogContent
      class="max-w-none! w-[90vw] h-[calc(100vh-100px)] p-0!"
      @interact-outside="handleInteractOutside"
    >
      <VisuallyHidden as-child>
        <DialogTitle>
          <DialogDescription />
        </DialogTitle>
      </VisuallyHidden>

      <div class="dialog-print wh-full grid overflow-hidden">
        <TitleBar class="col-start-1 col-end-3 row-start-1 row-end-2" />

        <SideBar class="col-start-1 col-end-2 row-start-2 row-end-3" />

        <PreivewPdf class="col-start-2 col-end-3 row-start-2 row-end-3" />
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import TitleBar from "./title-bar/index.vue";
import SideBar from "./side-bar/index.vue";
import PreivewPdf from "@/components/preview-pdf/index.vue";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "reka-ui";
import { open } from "./index";

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement;

  if (target.closest("[data-sonner-toast]")) {
    event.preventDefault();
  }
};
</script>

<style scoped lang="scss">
.dialog-print {
  grid-template-columns: 260px calc(100% - 260px);
  grid-template-rows: 44px calc(100% - 44px);
}
</style>
