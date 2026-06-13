<template>
  <Container :is-empty="presets.length == 0">
    <div class="pt-8 flex flex-col gap-8">
      <ItemGroup>
        <div class="flex items-center">
          <p class="py-3 px-4">打印范围预设</p>

          <Button class="w-fit ml-auto" size="sm" @click="handleAdd">
            <PlusIcon />

            <span>新建预设</span>
          </Button>
        </div>

        <ItemSeparator class="mb-4" />

        <PresetItem v-for="item in presets" :key="item.id" :data="item" />
      </ItemGroup>
    </div>

    <template #empty>
      <PresetEmpty />
    </template>
  </Container>
</template>

<script setup lang="ts">
import PresetItem from "./preset-item.vue";
import { ItemSeparator, ItemGroup } from "@/components/ui/item";
import Container from "@/components/container/index.vue";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-vue-next";
import { usePresetStore } from "@/stores/usePresetStore";
import eventEmitter from "@/hooks/eventEmitter";
import PresetEmpty from "./preset-empty.vue";

const { presets } = storeToRefs(usePresetStore());

//新建预设
const handleAdd = () => {
  eventEmitter.emit("dialog-preset:show", {
    type: "add",
  });
};
</script>

<style scoped lang="scss"></style>
