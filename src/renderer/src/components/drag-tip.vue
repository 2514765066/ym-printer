<template>
  <section class="mask flex-center absolute inset-0 pointer-events-none">
    <div class="px-2 py-1 rounded-md">
      <span class="text-main text-sm">导入pdf、doc、docx文件</span>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.mask {
  background-color: rgba(#fff, 0.13);

  > div {
    background-color: var(--bg-color);
  }
}
</style>
