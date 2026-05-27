<template>
  <Dialog v-model:open="open">
    <DialogContent @close-auto-focus="handleClose">
      <DialogHeader>
        <DialogTitle>新建工作空间</DialogTitle>
      </DialogHeader>

      <Field>
        <FieldLabel>工作空间名称</FieldLabel>

        <Input
          maxlength="10"
          v-model="name"
          placeholder="请输入工作空间名称(最大10字符)"
        />
      </Field>

      <DialogFooter>
        <Button @click="handleSubmit">确定</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import eventEmitter from "@/hooks/eventEmitter";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";

const { addWorkspace } = useWorkspaceStore();

const open = ref(false);

const name = ref("");

const handleClose = () => {
  open.value = false;
  name.value = "";
};

//处理提交
const handleSubmit = () => {
  if (name.value == "") {
    return;
  }

  addWorkspace(name.value);

  handleClose();
};

eventEmitter.on("dialog-workspace-add:show", () => {
  open.value = true;
});
</script>

<style scoped lang="scss"></style>
