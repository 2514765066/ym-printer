<template>
  <form class="flex flex-col border-r">
    <ElScrollbar view-class="p-2.5">
      <FieldGroup>
        <Remark />

        <Printer />

        <Count />

        <Mode />

        <Range />

        <Cardridge />

        <Orientation />
      </FieldGroup>
    </ElScrollbar>

    <ButtonGroup class="w-full mt-auto p-2.5">
      <Button
        type="button"
        class="flex-1"
        :disabled="isPrinting"
        @click="handlePrint"
      >
        <Spinner v-if="isPrinting" />

        {{ isPrinting ? "正在上传" : "开始打印" }}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button size="icon" :disabled="isPrinting">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" class="w-52">
          <DropdownMenuItem @select="handlePrintFinish">
            <CheckIcon />

            <span>标记为打印完成</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem :disabled="isSimplex" @select="handlePrintEven">
            <PrinterIcon />

            <span>打印 "偶数页"</span>
          </DropdownMenuItem>

          <DropdownMenuItem :disabled="isSimplex" @select="handlePrintOdd">
            <PrinterIcon />

            <span>打印 "奇数页"</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  </form>
</template>

<script setup lang="ts">
import { Spinner } from "@/components/ui/spinner";
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
import Remark from "./config/remark.vue";
import Printer from "./config/printer.vue";
import Count from "./config/count.vue";
import Mode from "./config/mode.vue";
import Range from "./config/range.vue";
import Cardridge from "./config/cardridge.vue";
import Orientation from "./config/orientation.vue";
import { FieldGroup } from "@/components/ui/field";
import { ElScrollbar } from "element-plus";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { usePrinterStore } from "@/stores/usePrinterStore";
import { useDocStore } from "@/stores/useDocStore";
import { printAuto, printEven, printOdd } from "@/utils/print";
import eventEmitter from "@/hooks/eventEmitter";
import { close } from "../index";
import { parserRange } from "@/utils/range";

const { selectedPrinter } = storeToRefs(usePrinterStore());
const { selectedDoc, selectedDocID } = storeToRefs(useDocStore());
const { getDoc } = useDocStore();
const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      remark: z.string(),
      printer: z.string().min(1, "请选择打印机"),
      count: z.number().min(1, "最少1份").max(999, "最大999份"),
      mode: z.string("请选择打印模式"),
      range: z.string().superRefine((value, ctx) => {
        //允许空值
        if (value === "") {
          return;
        }

        //验证格式
        const reg = /^(\d*?-\d*?|\d+)([,，](\d*?-\d*?|\d+))*$/;

        if (!reg.test(value)) {
          ctx.addIssue("格式有误");
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
          ctx.addIssue("超出打印范围");
        }
      }),
      cartridge: z.string().min(1, "请选择墨盒颜色"),
      orientation: z.string().min(1, "请选择方向"),
    }),
  ),
  initialValues: {
    remark: "",
    printer: selectedPrinter.value,
    count: 1,
    mode: "mix",
    range: "",
    cartridge: "black",
    orientation: "portrait",
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

  isPrinting.value = true;

  await printAuto(
    toRaw(doc),
    () => {
      doc.status = "printed";

      eventEmitter.emit("success:show", "打印完成");
    },
    () => {
      doc.status = "init";

      eventEmitter.emit("error:show", "取消打印");
    },
  );

  isPrinting.value = false;
});

//标记为已完成
const handlePrintFinish = handleSubmit(async values => {
  //关闭弹窗
  close();

  const doc = getDoc(selectedDocID.value)!;

  Object.assign(doc, values);

  doc.formatRange = parserRange(selectedDoc.value);

  doc.status = "printed";

  eventEmitter.emit("success:show", "标记为打印完成");
});

//打印偶数页
const handlePrintEven = handleSubmit(async values => {
  const doc = { ...toRaw(getDoc(selectedDocID.value)!) };

  Object.assign(doc, values);

  isPrinting.value = true;

  await printEven(doc);

  isPrinting.value = false;

  eventEmitter.emit("success:show", "打印偶数页完成");
});

//打印奇数页
const handlePrintOdd = handleSubmit(async values => {
  const doc = { ...toRaw(getDoc(selectedDocID.value)!) };

  Object.assign(doc, values);

  isPrinting.value = true;

  await printOdd(toRaw(doc));

  isPrinting.value = false;

  eventEmitter.emit("success:show", "打印奇数页完成");
});
</script>

<style scoped lang="scss"></style>
