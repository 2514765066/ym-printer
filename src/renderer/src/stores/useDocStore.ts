import eventEmitter from "@/hooks/eventEmitter";
import { Doc } from "@type";

export const useDocStore = defineStore("doc", () => {
  //所有文件
  const docs = ref<Doc[]>([]);

  //当前选中的文件id
  const selectedDocID = ref("");

  //当前选中的文件
  const selectedDoc = computed<Doc>(() => {
    return (
      getDoc(selectedDocID.value) || {
        status: "init",
        id: "",
        name: "",
        path: "",
        md5: "",
        ext: "",
        pageCount: 0,
        remark: "",
        printer: "",
        count: 0,
        mode: "mix",
        range: "",
        cartridge: "black",
        orientation: "portrait",
      }
    );
  });

  //获取文档
  const getDoc = (id: string) => {
    return docs.value.find(item => item.id == id);
  };

  //选中文件
  const selectDoc = (id: string) => {
    selectedDocID.value = id;
  };

  //删除文件
  const removeDoc = (id: string) => {
    docs.value = docs.value.filter(doc => doc.id != id);
  };

  //添加文件
  const addDoc = (file: File[]) => {
    const paths = api.getFilePath(file);

    if (paths.length == 0) {
      return;
    }

    ipcRenderer.invoke("addDoc", paths);
  };

  //清空
  const clearDoc = () => {
    docs.value = [];
  };

  //文件获取完成
  ipcRenderer.on("addDocFinish", (_, data) => {
    const ids = docs.value.map(item => item.id);

    for (const item of data) {
      if (ids.includes(item.id)) {
        eventEmitter.emit("error:show", `${item.name} 已存在`);
        return;
      }

      docs.value.push(item);
    }
  });

  return {
    docs,
    selectedDocID,
    selectedDoc,
    addDoc,
    clearDoc,
    removeDoc,
    selectDoc,
    getDoc,
  };
});
