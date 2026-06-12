<template>
  <section
    class="h-5.25 flex flex-wrap items-center gap-2 overflow-hidden"
    :class="{
      'pointer-events-none': status == 'price',
    }"
  >
    <Tooltip label="打印价格" v-if="config.price">
      <Badge class="rounded"> {{ price }} 元 </Badge>
    </Tooltip>

    <Tooltip label="打印所需纸张数量">
      <Badge class="rounded" variant="secondary"> {{ paperCount }} 张纸 </Badge>
    </Tooltip>

    <Tooltip label="打印文档数量">
      <Badge class="rounded" variant="secondary"> {{ data.count }} 份 </Badge>
    </Tooltip>

    <Tooltip label="打印模式">
      <Badge class="rounded" variant="secondary">
        {{ modeMap[data.mode] }}
      </Badge>
    </Tooltip>

    <Tooltip label="打印范围">
      <Badge class="rounded" variant="secondary">
        {{ data.range || "1-" }}
      </Badge>
    </Tooltip>

    <Tooltip label="墨盒颜色">
      <Badge class="rounded" variant="secondary">
        {{ cartridgeMap[data.cartridge] }}
      </Badge>
    </Tooltip>

    <Tooltip label="打印方向">
      <Badge class="rounded" variant="secondary">
        {{ orientationMap[data.orientation] }}
      </Badge>
    </Tooltip>
  </section>
</template>

<script setup lang="ts">
import Tooltip from "@/components/tooltip.vue";
import { Badge } from "@/components/ui/badge";
import { usePaper } from "@/hooks/paper";
import { usePrice } from "@/hooks/usePrice";
import { cartridgeMap, modeMap, orientationMap } from "@/map";
import { useConfigStore } from "@/stores/useConfigStore";
import { status } from "@/views/doc";
import { Doc } from "@type";

const { config } = storeToRefs(useConfigStore());

const props = defineProps<{
  data: Doc;
}>();

const price = usePrice(props.data);
const paperCount = usePaper(props.data);
</script>

<style scoped lang="scss"></style>
