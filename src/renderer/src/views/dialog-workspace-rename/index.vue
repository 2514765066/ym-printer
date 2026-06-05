<template>
  <Dialog v-model:open="open">
    <DialogContent :aria-describedby="undefined">
      <DialogHeader>
        <DialogTitle>重命名工作空间</DialogTitle>
      </DialogHeader>

      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>工作空间名称</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="请输入新的工作空间名称"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      </FormField>

      <DialogFooter>
        <Button @click="handleClick">确定</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "vee-validate";
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
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const { renameWorkspace } = useWorkspaceStore();

const open = ref(false);

const { handleSubmit, setValues } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      id: z.string(),
      name: z
        .string({
          message: "请输入名称",
        })
        .min(1, "请输入名称"),
    }),
  ),
  initialValues: {
    id: "",
    name: "",
  },
});

const handleClose = () => {
  open.value = false;
};

//处理提交
const handleClick = handleSubmit(values => {
  console.log(values);

  renameWorkspace(values.id, values.name);

  handleClose();
});

eventEmitter.on("dialog-workspace-rename:show", data => {
  setValues(data);

  open.value = true;
});
</script>

<style scoped lang="scss"></style>
