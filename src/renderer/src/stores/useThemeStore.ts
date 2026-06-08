import { useColorMode, useStorage } from "@vueuse/core";

export const useThemeStore = defineStore("theme", () => {
  //系统主题
  const theme = useColorMode();

  //文档主题
  const previewTheme = useStorage("previewTheme", "light");

  //切换主题
  const togglePreviewTheme = () => {
    previewTheme.value = previewTheme.value == "dark" ? "light" : "dark";
  };

  watchEffect(() => {
    ipcRenderer.invoke("toggleTheme", theme.value);
  });

  return {
    theme,
    previewTheme,
    togglePreviewTheme,
  };
});
