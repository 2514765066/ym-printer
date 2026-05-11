<template>
  <Item
    class="dark:hover:bg-accent/30 has-aria-checked:border-primary has-aria-checked:bg-primary/10 has-aria-checked:hover:bg-primary/20!"
    size="sm"
    variant="outline"
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

      <Check class="size-7 stroke-green-500!" v-else />
    </ItemMedia>

    <ItemContent>
      <ItemTitle>
        <span v-if="data.remark"> {{ data.remark }} | </span>

        {{ data.name }}
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
      <span class="text-sm text-green-500">{{ price }} 元</span>
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
import { Check } from "lucide-vue-next";
import { cartridgeMap, modeMap, orientationMap } from "@/map";
import { getPrice } from "@/utils/price";
import { status } from "../index";
import { checked, toggleCheck } from "../check";

defineEmits<{
  print: [id: string];
}>();

const data = defineModel<Doc>({ required: true });

const price = computed(() => {
  return getPrice(data.value);
});
</script>

<style scoped lang="scss"></style>
