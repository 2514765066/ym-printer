type Status = "allCheck" | "hasCheck" | "noneCheck";

export default <T extends any>(list: Ref<Map<string, T>>) => {
  const checkAll = ref(false);

  //选中的内容
  const checked = ref(new Set()) as Ref<Set<string>>;

  //状态
  const status = computed<Status>(() => {
    if (checked.value.size == 0) {
      checkAll.value = false;
      return "noneCheck";
    }

    if (list.value.size == checked.value.size) {
      checkAll.value = true;
      return "allCheck";
    }

    return "hasCheck";
  });

  //选中
  const check = (id: string) => {
    checked.value.add(id);
  };

  //取消选中
  const cancelCheck = (id: string) => {
    checked.value.delete(id);
  };

  //是否选中
  const hasCheck = (id: string) => {
    return checked.value.has(id);
  };

  //切换选择
  const toggleCheck = (id: string) => {
    hasCheck(id) ? cancelCheck(id) : check(id);
  };

  //全选
  const toggleAllCheck = () => {
    if (checked.value.size != 0) {
      checked.value.clear();
      return;
    }

    checked.value = new Set(list.value.keys());
  };

  return {
    checkAll,
    status,
    checked,
    hasCheck,
    toggleCheck,
    toggleAllCheck,
    cancelCheck,
  };
};
