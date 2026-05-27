<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>重命名工作空间</DialogTitle>
      </DialogHeader>

      <Field>
        <FieldLabel>工作空间名称</FieldLabel>

        <Input
          maxlength="10"
          v-model="name"
          placeholder="请输入新的工作空间名称"
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

const { renameWorkspace } = useWorkspaceStore();

let id = "";

const open = ref(false);

const name = ref("");

const handleClose = () => {
  open.value = false;
};

//处理提交
const handleSubmit = () => {
  if (name.value == "") {
    return;
  }

  renameWorkspace(id, name.value);

  handleClose();
};

eventEmitter.on("dialog-workspace-rename:show", old => {
  id = old.id;
  name.value = old.name;

  open.value = true;
});
</script>

<style scoped lang="scss"></style>
