<template>
  <section class="absolute bottom-1 right-1">
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
  </section>
</template>

<script setup lang="ts">
import { DollarSignIcon, XIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { setStatus, status } from "../index";
import { cancelCheckAll } from "../check";

//处理取消计价
const handleCancelPrice = () => {
  setStatus();

  cancelCheckAll();
};
</script>

<style scoped lang="scss"></style>
