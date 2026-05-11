export const checked = ref(new Set<string>());

//切换选中
export const toggleCheck = (id: string) => {
  if (checked.value.has(id)) {
    checked.value.delete(id);
    return;
  }

  checked.value.add(id);
};

//全选
export const checkAll = (ids: string[]) => {
  for (const id of ids) {
    checked.value.add(id);
  }
};

//取消全选
export const cancelCheckAll = () => {
  checked.value.clear();
};
