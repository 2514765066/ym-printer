<template>
  <section class="flex items-center gap-2">
    <Button variant="outline" @click="handleCheckAll">
      <SquareCheckIcon />

      <span>全选文档</span>
    </Button>

    <Button variant="outline" @click="cancelCheckAll">
      <SquareIcon />

      <span>取消全选</span>
    </Button>

    <Button variant="outline" @click="handleCancelPrice">
      <XIcon />

      <span>取消计价</span>
    </Button>

    <span class="ml-auto mr-4 text-sm text-green-500">
      总价: {{ price }} 元
    </span>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { SquareCheckIcon, SquareIcon, XIcon } from "lucide-vue-next";
import { setStatus } from "../index";
import { cancelCheckAll, checkAll, checked } from "../check";
import { useDocStore } from "@/stores/useDocStore";
import { getPrice } from "@/utils/price";

const { docs } = storeToRefs(useDocStore());
const { getDoc } = useDocStore();

//总价
const price = computed(() => {
  let res = 0;

  for (const id of checked.value) {
    const doc = getDoc(id);

    if (!doc) {
      continue;
    }

    res += getPrice(doc) * 100;
  }

  return (res / 100).toFixed(2);
});

//全选
const handleCheckAll = () => {
  const ids = docs.value
    .filter(item => item.status == "printed")
    .map(item => item.id);

  checkAll(ids);
};

//处理取消计价
const handleCancelPrice = () => {
  setStatus();

  cancelCheckAll();
};
</script>

<style scoped lang="scss"></style>
