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
import { usePrinterStore } from "@/stores/usePrinterStore";

const { selectedPrinter } = storeToRefs(usePrinterStore());
const { addWorkspace, editWorkspace } = useWorkspaceStore();

const open = ref(false);

//dialog类型
const dialogType = ref<"add" | "edit">("add");

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      id: z.string(),
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
    id: "",
    name: "",
    printer: "",
  },
});

//关闭
const handleClose = () => {
  open.value = false;
};

//处理提交
const handleClick = handleSubmit(values => {
  switch (dialogType.value) {
    case "add":
      console.log(values);

      addWorkspace(values);
      break;
    case "edit":
      editWorkspace(values);
      break;
  }

  handleClose();
});

eventEmitter.on("dialog-workspace:show", option => {
  dialogType.value = option.type;

  switch (dialogType.value) {
    case "add":
      setValues({
        printer: selectedPrinter.value,
      });
      break;
    case "edit":
      setValues(option.data!);
      break;
  }

  open.value = true;
});
</script>

<style scoped lang="scss"></style>
