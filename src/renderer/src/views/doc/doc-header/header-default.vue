<template>
  <section class="flex gap-2">
    <Button variant="ghost" size="sm" @click="setStatus('price')">
      <DollarSignIcon />

      <span>计价</span>
    </Button>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { DollarSignIcon } from "lucide-vue-next";
import { setStatus } from "../index";
</script>

<style scoped lang="scss"></style>
