import { FileInfo } from "@type";

export const useFileStore = defineStore("file", () => {
  //所有文件
  const data = ref<Map<string, FileInfo>>(new Map());

  //选中的id = md5 + path
  const selectedID = ref("");

  //当前选中的文件
  const selectedFile = computed(() => data.value.get(selectedID.value));

  //文件是否存在
  const has = (id: string) => {
    return data.value.has(id);
  };

  //获取文件
  const get = (id: string) => {
    return data.value.get(id)!;
  };

  //选中文件
  const select = (id: string) => {
    selectedID.value = id;
  };

  //删除文件
  const remove = (id: string) => {
    data.value.delete(id);
  };

  //添加文件
  const add = async (files: File[]) => {
    const paths = api.getFilePath(files);

    if (paths.length == 0) {
      return;
    }

    const res = await ipcRenderer.invoke("getFilesInfo", paths);

    for (const item of res) {
      const id = item.md5 + item.path;

      if (has(id)) {
        continue;
      }

      data.value.set(id, item);
    }
  };

  //清空
  const clear = () => {
    data.value.clear();
  };

  return {
    data,
    selectedID,
    selectedFile,
    add,
    select,
    clear,
    get,
    remove,
  };
});
