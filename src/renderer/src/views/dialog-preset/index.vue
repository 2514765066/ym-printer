<template>
  <Dialog v-model:open="open">
    <DialogContent
      :aria-describedby="undefined"
      @close-auto-focus="handleClose"
    >
      <DialogHeader>
        <DialogTitle>
          {{ presetTypeMap[dialogType] }}
        </DialogTitle>
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
import { useForm } from "vee-validate";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { usePresetStore } from "@/stores/usePresetStore";
import { presetTypeMap } from "@/map/index";

const { addPreset, editPreset } = usePresetStore();

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
      value: z
        .string()
        .min(1, "请输入打印范围")
        .superRefine((value, ctx) => {
          //允许空值
          if (value === "") {
            return;
          }

          //验证格式
          const reg = /^(\d*?-\d*?|\d+)([,，](\d*?-\d*?|\d+))*$/;

          if (!reg.test(value)) {
            ctx.addIssue({
              code: "custom",
              message: "格式有误",
            });
            return;
          }
        }),
    }),
  ),
  initialValues: {
    id: "",
    name: "",
    value: "",
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
      addPreset(values);
      break;
    case "edit":
      editPreset(values);
      break;
  }

  handleClose();
});

eventEmitter.on("dialog-preset:show", option => {
  dialogType.value = option.type;

  switch (dialogType.value) {
    case "edit":
      setValues(option.data!);
      break;
  }

  open.value = true;
});
</script>

<style scoped lang="scss"></style>
