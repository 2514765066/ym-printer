import { FileInfo } from "@type";

export const useFileStore = defineStore("print-file", () => {
  const file = ref<FileInfo>({
    name: "",
    path: "",
    md5: "",
    ext: "",
    id: "",
  });

  const setFile = (value: FileInfo) => {
    file.value = value;
  };

  return {
    file,
    setFile,
  };
});
