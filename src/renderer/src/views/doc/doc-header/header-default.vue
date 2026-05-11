<template>
  <section class="flex gap-2">
    <Button variant="outline" @click="addDoc">
      <PlusIcon />

      <span>新增文档</span>
    </Button>

    <Button variant="outline" @click="setStatus('price')">
      <DollarSignIcon />

      <span>计价</span>
    </Button>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button class="ml-auto" variant="outline" size="icon">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuItem variant="destructive" @click="handleRemoveAll">
          <Trash2Icon class="stroke-destructive!" />

          <span>删除 "全部文档"</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </section>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DollarSignIcon,
  MoreHorizontalIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-vue-next";
import { setStatus } from "../index";
import { useDocStore } from "@/stores/useDocStore";
import eventEmitter from "@/hooks/eventEmitter";

const { clearDoc } = useDocStore();

//新增文档
const addDoc = () => {
  ipcRenderer.invoke("addDoc");
};

//删除全部文档
const handleRemoveAll = () => {
  clearDoc();

  eventEmitter.emit("success:show", "已删除全部文档");
};
</script>

<style scoped lang="scss"></style>
