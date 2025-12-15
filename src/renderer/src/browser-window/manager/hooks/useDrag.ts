import { DirectiveBinding } from "vue";

export default {
  mounted(
    el: HTMLElement,
    binding: DirectiveBinding<{
      onEnter?: (e: DragEvent) => void;
      onOver?: (e: DragEvent) => void;
      onLeave?: (e: DragEvent) => void;
      onDrop?: (e: DragEvent) => void;
      onChange?: (data: boolean) => void;
    }>
  ) {
    let dragLeaveTimeout: number | undefined;
    //@ts-ignore
    let isDraggingOver = false;

    const handleChange = (value: boolean) => {
      isDraggingOver = value;
      if (binding.value?.onChange) binding.value.onChange(value);
    };

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      handleChange(true);
      if (binding.value?.onEnter) binding.value.onEnter(e);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      clearTimeout(dragLeaveTimeout);
      if (binding.value?.onOver) binding.value.onOver(e);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragLeaveTimeout = window.setTimeout(() => {
        handleChange(false);
        if (binding.value?.onLeave) binding.value.onLeave(e);
      }, 100);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      clearTimeout(dragLeaveTimeout);
      handleChange(false);
      if (binding.value?.onDrop) binding.value.onDrop(e);
    };

    el.addEventListener("dragenter", handleDragEnter);
    el.addEventListener("dragover", handleDragOver);
    el.addEventListener("dragleave", handleDragLeave);
    el.addEventListener("drop", handleDrop);

    // 存储引用，方便卸载时移除
    (el as any)._dragHandlers = {
      handleDragEnter,
      handleDragOver,
      handleDragLeave,
      handleDrop,
    };
  },

  unmounted(el: HTMLElement) {
    const handlers = (el as any)._dragHandlers;
    if (handlers) {
      el.removeEventListener("dragenter", handlers.handleDragEnter);
      el.removeEventListener("dragover", handlers.handleDragOver);
      el.removeEventListener("dragleave", handlers.handleDragLeave);
      el.removeEventListener("drop", handlers.handleDrop);
      delete (el as any)._dragHandlers;
    }
  },
};
