<template>
  <fieldset :disabled="isPrinting" class="pt-3 pb-1 flex flex-col">
    <PrintConfig />

    <ButtonGroup class="w-full mt-auto px-3">
      <Button class="flex-1 border-r" @click="handlePrint">
        {{ isPrinting ? "正在打印" : "开始打印" }}
      </Button>

      <Button class="flex-1 border-r" @click="handlePrePrint">
        预备打印
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="icon">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" class="w-52">
          <DropdownMenuItem @click="handlePrintFinish">
            <CheckIcon />

            <span>标记为打印完成</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem :disabled="!isSimplex" @click="handlePrintSimplex">
            <PrinterIcon />

            <span>打印 "单页"</span>
          </DropdownMenuItem>

          <DropdownMenuItem :disabled="isSimplex" @click="handlePrintEven">
            <PrinterIcon />

            <span>打印 "偶数页"</span>
          </DropdownMenuItem>

          <DropdownMenuItem :disabled="isSimplex" @click="handlePrintOdd">
            <PrinterIcon />

            <span>打印 "奇数页"</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  </fieldset>
</template>

<script setup lang="ts">
import PrintConfig from "./print-config/index.vue";
import { CheckIcon, MoreHorizontalIcon, PrinterIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { useWorkspaceStore } from "@/stores/useWorkspaceStore";
import { useDocStore } from "@/stores/useDocStore";
import { printAuto, printEven, printOdd } from "@/utils/print";
import eventEmitter from "@/hooks/eventEmitter";
import { close } from "../index";
import { parserRange } from "@/utils/range";
import { printPromise } from "@/stores/usePrintStore";

const { selectedDoc, selectedDocID } = storeToRefs(useDocStore());
const { getDoc } = useDocStore();
const { selectedWorkspace } = storeToRefs(useWorkspaceStore());

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      remark: z.string(),
      printer: z.string().min(1, "请选择打印机"),
      count: z.number({ message: "" }).min(1, "最少1份").max(999, "最大999份"),
      mode: z.string({
        message: "请选择打印模式",
      }),
      range: z.string().superRefine((value, ctx) => {
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

        // 打印范围验证
        const pages = value.split(/[,，-]/);

        const isOutOfRange = pages.some(item => {
          if (item === "") {
            return;
          }

          const page = Number(item);

          return page > selectedDoc.value!.pageCount || page < 1;
        });

        if (isOutOfRange) {
          ctx.addIssue({
            code: "custom",
            message: "超出打印范围",
          });
        }
      }),
      cartridge: z.string({
        message: "请选择墨盒颜色",
      }),
      orientation: z.string({
        message: "请选择方向",
      }),
    }),
  ),
  initialValues: {
    remark: selectedDoc.value.remark || "",
    printer: selectedDoc.value.printer || selectedWorkspace.value.printer || "",
    count: selectedDoc.value.count || 1,
    mode: selectedDoc.value.mode || "mix",
    range: selectedDoc.value.range || "",
    cartridge: selectedDoc.value.cartridge || "black",
    orientation: selectedDoc.value.orientation || "portrait",
  },
});

//是否再打印
const isPrinting = ref(false);

//是否是单打
const isSimplex = computed(() => values.mode == "simplex");

//打印
const handlePrint = handleSubmit(async values => {
  //关闭弹窗
  close();

  const doc = getDoc(selectedDocID.value)!;

  Object.assign(doc, values);

  doc.formatRange = parserRange(selectedDoc.value);

  doc.status = "printing";

  await printAuto(toRaw(doc), {
    printFinish() {
      doc.status = "printed";

      eventEmitter.emit("success:show", `打印完成 "${doc.name}"`);
    },
    printCancel() {
      doc.status = "init";

      eventEmitter.emit("error:show", `取消打印 "${doc.name}"`);
    },
    printBefore() {
      doc.status = "upload";
    },
    printAfter() {
      doc.status = "printing";
    },
  });
});

//预备打印
const handlePrePrint = handleSubmit(async values => {
  //关闭弹窗
  close();

  const doc = getDoc(selectedDocID.value)!;

  Object.assign(doc, values);

  doc.formatRange = parserRange(selectedDoc.value);

  doc.status = "prepare";

  const result = await printPromise(doc);

  if (!result) {
    doc.status = "init";

    eventEmitter.emit("error:show", `取消打印 "${doc.name}"`);
    return;
  }

  await printAuto(toRaw(doc), {
    printFinish() {
      doc.status = "printed";

      eventEmitter.emit("success:show", `打印完成 "${doc.name}"`);
    },
    printCancel() {
      doc.status = "init";

      eventEmitter.emit("error:show", `取消打印 "${doc.name}"`);
    },
    printBefore() {
      doc.status = "upload";
    },
    printAfter() {
      doc.status = "printing";
    },
  });
});

//标记为已完成
const handlePrintFinish = handleSubmit(async values => {
  //关闭弹窗
  close();

  const doc = getDoc(selectedDocID.value)!;

  Object.assign(doc, values);

  doc.formatRange = parserRange(selectedDoc.value);

  doc.status = "printed";

  eventEmitter.emit("success:show", `打印完成 "${doc.name}"`);
});

//打印单页
const handlePrintSimplex = handleSubmit(async values => {
  const doc = { ...toRaw(getDoc(selectedDocID.value)!) };

  Object.assign(doc, values);

  isPrinting.value = true;

  eventEmitter.emit("loading:show", {
    loadingMsg: "正在打印单页",
    successMsg: `打印单页完成 "${doc.name}"`,
    errorMsg: "打印单页失败",
    async cb() {
      await printOdd(doc);
    },
  });

  isPrinting.value = false;
});

//打印偶数页
const handlePrintEven = handleSubmit(async values => {
  const doc = { ...toRaw(getDoc(selectedDocID.value)!) };

  Object.assign(doc, values);

  isPrinting.value = true;

  eventEmitter.emit("loading:show", {
    loadingMsg: "正在打印偶数页",
    successMsg: `打印偶数页完成 "${doc.name}"`,
    errorMsg: "打印偶数页失败",
    async cb() {
      await printEven(doc);
    },
  });

  await printEven(doc);

  isPrinting.value = false;
});

//打印奇数页
const handlePrintOdd = handleSubmit(async values => {
  const doc = { ...toRaw(getDoc(selectedDocID.value)!) };

  Object.assign(doc, values);

  isPrinting.value = true;

  eventEmitter.emit("loading:show", {
    loadingMsg: "正在打印奇数页",
    successMsg: `打印奇数页完成 "${doc.name}"`,
    errorMsg: "打印奇数页失败",
    async cb() {
      await printOdd(doc);
    },
  });

  isPrinting.value = false;
});
</script>

<style scoped lang="scss"></style>
