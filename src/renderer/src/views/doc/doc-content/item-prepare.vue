<template>
  <Item
    class="hover:bg-accent/30 rounded-none!"
    size="sm"
    @click="$emit('print', data.id)"
  >
    <ItemMedia variant="image">
      <FileIcon :size="36" :ext="data.ext" />
    </ItemMedia>

    <ItemContent>
      <ItemTitle>
        <span v-if="data.remark"> {{ data.remark }}</span>

        <span class="mx-1 text-muted-foreground" v-if="data.remark"> | </span>

        <span> {{ data.name }}</span>
      </ItemTitle>

      <ItemDescription class="flex gap-4">
        <div class="flex items-center gap-1">
          <span class="text-sm">份数:</span>

          <Badge class="rounded" variant="secondary">
            {{ data.count }}
          </Badge>
        </div>

        <div class="flex items-center gap-1">
          <span class="text-sm">模式:</span>

          <Badge class="rounded" variant="secondary">
            {{ modeMap[data.mode] }}
          </Badge>
        </div>

        <div class="flex items-center gap-1">
          <span class="text-sm">范围:</span>

          <Badge class="rounded" variant="secondary">
            {{ data.range || "-" }}
          </Badge>
        </div>

        <div class="flex items-center gap-1">
          <span class="text-sm">颜色:</span>

          <Badge class="rounded" variant="secondary">
            {{ cartridgeMap[data.cartridge] }}
          </Badge>
        </div>

        <div class="flex items-center gap-1">
          <span class="text-sm">方向:</span>

          <Badge class="rounded" variant="secondary">
            {{ orientationMap[data.orientation] }}
          </Badge>
        </div>
      </ItemDescription>
    </ItemContent>

    <ItemActions>
      <ButtonGroup>
        <Tooltip label="准备就绪，开始打印">
          <Button variant="outline" size="sm" @click.stop="handleNext">
            <PrinterIcon /> 开始
          </Button>
        </Tooltip>

        <Tooltip label="取消">
          <Button variant="outline" size="icon-sm" @click.stop="handleCancel">
            <XIcon class="size-4" />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </ItemActions>
  </Item>
</template>

<script setup lang="ts">
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { Doc } from "@type";
import FileIcon from "@/components/file-icon.vue";
import { Button } from "@/components/ui/button";
import { PrinterIcon, XIcon } from "lucide-vue-next";
import Tooltip from "@/components/tooltip.vue";
import { printNext, printCancel } from "@/stores/usePrintStore";
import { ButtonGroup } from "@/components/ui/button-group";
import { cartridgeMap, modeMap, orientationMap } from "@/map";

const props = defineProps<{
  data: Doc;
}>();

const handleNext = () => {
  printNext(props.data.id);
};

const handleCancel = () => {
  printCancel(props.data.id);
};
</script>

<style scoped lang="scss"></style>
