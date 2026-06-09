<template>
  <Item
    class="hover:bg-accent dark:hover:bg-accent/30 has-aria-checked:bg-primary/15 has-aria-checked:hover:bg-primary/20! rounded-none!"
    size="sm"
    as="label"
    :for="data.id"
    @click="$emit('print', data.id)"
  >
    <ItemMedia variant="image">
      <Checkbox
        :id="data.id"
        v-if="status == 'price'"
        :model-value="checked.has(data.id)"
        @update:model-value="toggleCheck(data.id)"
      />

      <Spinner class="size-7 text-muted-foreground" v-else />
    </ItemMedia>

    <ItemContent>
      <ItemTitle>
        <span v-if="data.remark"> {{ data.remark }}</span>

        <span class="mx-1 text-muted-foreground" v-if="data.remark"> | </span>

        <span> {{ data.name }}</span>
      </ItemTitle>

      <ItemDescription class="flex gap-4">
        <Badge class="rounded"> {{ price }} 元 </Badge>

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
      <span class="text-muted-foreground" v-if="data.status == 'upload'">
        正在上传...
      </span>

      <ButtonGroup v-if="data.status == 'printing'">
        <Tooltip label="继续打印奇数页">
          <Button variant="outline" size="sm" @click.stop="handleNext">
            <Spinner /> 继续
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-vue-next";
import Tooltip from "@/components/tooltip.vue";
import { printNext, printCancel } from "@/stores/usePrintStore";
import { ButtonGroup } from "@/components/ui/button-group";
import { cartridgeMap, modeMap, orientationMap } from "@/map";
import { usePrice } from "@/hooks/usePrice";
import { checked, toggleCheck } from "../check";
import { status } from "..";

const props = defineProps<{
  data: Doc;
}>();

const price = usePrice(props.data);

const handleNext = () => {
  printNext(props.data.id);
};

const handleCancel = () => {
  printCancel(props.data.id);
};
</script>

<style scoped lang="scss"></style>
