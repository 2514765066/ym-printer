<template>
  <Dialog v-model:open="open">
    <DialogContent
      :aria-describedby="undefined"
      @close-auto-focus="handleClose"
    >
      <DialogHeader>
        <DialogTitle>新建工作空间</DialogTitle>
      </DialogHeader>

      <Form />

      <DialogFooter>
        <Button @click="handleClick">确定</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import Form from "./form/index.vue";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import eventEmitter from "@/hooks/eventEmitter";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const { addWorkspace } = useWorkspaceStore();

const open = ref(false);

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z
        .string({
          message: "请输入名称",
        })
        .min(1, "请输入名称"),
      printer: z
        .string({
          message: "请选择打印机",
        })
        .min(1, "请选择打印机"),
    }),
  ),
  initialValues: {
    name: "",
    printer: "",
  },
});

const handleClose = () => {
  open.value = false;
};

//处理提交
const handleClick = handleSubmit(values => {
  addWorkspace(values);

  handleClose();
});

eventEmitter.on("dialog-workspace-add:show", () => {
  open.value = true;
});
</script>

<style scoped lang="scss"></style>
