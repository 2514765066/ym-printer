<template>
  <footer
    class="w-full p-1 absolute bottom-0 left-0 flex items-center gap-4"
    v-if="docs.length"
  >
    <Button variant="ghost" size="sm">
      <span class="text-xs">
        打印完成文档: {{ finishCount }} / {{ docs.length }}
      </span>
    </Button>

    <div class="ml-auto">
      <Button size="sm" @click="setStatus('price')" v-if="status == 'default'">
        <DollarSignIcon />

        <span class="text-xs"> 计价</span>
      </Button>

      <Button
        size="sm"
        variant="destructive"
        @click="handleCancelPrice"
        v-else-if="status == 'price'"
      >
        <XIcon />

        <span class="text-xs"> 取消计价</span>
      </Button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { DollarSignIcon, XIcon } from "lucide-vue-next";
import { setStatus, status } from "../index";
import { cancelCheckAll } from "../check";
import { useDocStore } from "@/stores/useDocStore";
import { Button } from "@/components/ui/button";

const { docs } = storeToRefs(useDocStore());

const finishCount = computed(() => {
  return docs.value.reduce((previousValue, currentValue) => {
    if (currentValue.status == "printed") {
      previousValue++;
    }

    return previousValue;
  }, 0);
});

//处理取消计价
const handleCancelPrice = () => {
  setStatus();

  cancelCheckAll();
};
</script>

<style scoped lang="scss">
footer {
  background: linear-gradient(to top, var(--background) 10%, transparent);
}
</style>
