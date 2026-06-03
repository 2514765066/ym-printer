<template>
  <Item class="relative dark:hover:bg-accent/30 rounded-none!" size="sm">
    <ItemMedia variant="image">
      <Spinner class="size-7 text-muted-foreground" />
    </ItemMedia>

    <ItemContent>
      <ItemTitle>
        <span v-if="data.remark"> {{ data.remark }} | </span>

        {{ data.name }}
      </ItemTitle>

      <ItemDescription>
        {{ data.path }}
      </ItemDescription>
    </ItemContent>

    <ItemActions>
      <span class="text-muted-foreground" v-if="data.status == 'upload'">
        正在上传...
      </span>

      <ButtonGroup v-if="data.status == 'printing'">
        <Tooltip label="继续打印奇数页">
          <Button variant="outline" size="sm" @click="handleNext">
            <PrinterIcon /> 继续
          </Button>
        </Tooltip>

        <Tooltip label="取消">
          <Button variant="outline" size="icon-sm" @click="handleCancel">
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
import { Doc } from "@type";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { PrinterIcon, XIcon } from "lucide-vue-next";
import Tooltip from "@/components/tooltip.vue";
import { printNext, printCancel } from "@/stores/usePrintStore";
import { ButtonGroup } from "@/components/ui/button-group";

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
