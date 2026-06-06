<template>
  <Sheet v-model:open="open">
    <SheetContent
      :aria-describedby="undefined"
      side="bottom"
      class="h-[calc(100vh-44px)] p-0!"
      @open-auto-focus.prevent
    >
      <VisuallyHidden as-child>
        <SheetTitle />
      </VisuallyHidden>

      <div class="print-preview wh-full grid bg-sidebar">
        <TitleBar />

        <ResizablePanelGroup
          class="pb-2"
          direction="horizontal"
          autoSaveId="print-preview-layout"
        >
          <ResizablePanel :min-size="240" :default-size="260" size-unit="px">
            <SideBar class="h-full" />
          </ResizablePanel>

          <ResizableHandle class="bg-transparent!" />

          <ResizablePanel class="pr-2" :min-size="50">
            <Preview
              class="h-full bg-background border rounded-lg overflow-hidden"
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import TitleBar from "./title-bar/index.vue";
import SideBar from "./side-bar/index.vue";
import Preview from "./preview/index.vue";
import { VisuallyHidden } from "reka-ui";
import { open } from "./index";
</script>

<style scoped lang="scss">
.print-preview {
  grid-template-rows: 40px calc(100% - 40px);
}
</style>
