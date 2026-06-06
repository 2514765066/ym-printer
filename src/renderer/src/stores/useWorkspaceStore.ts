import { useStorage } from "@vueuse/core";
import { nanoid } from "nanoid";

export interface Workspace {
  id: string;
  name: string;
  printer: string;
}

export const useWorkspaceStore = defineStore("workspace", () => {
  //所有工作空间
  const workspace = useStorage<Workspace[]>("workspace", [
    {
      id: "default",
      name: "默认空间",
      printer: "",
    },
  ]);

  //当前选中的工作空间id
  const selectedWorkspaceID = ref("default");

  //当前选中的工作空间
  const selectedWorkspace = computed<Workspace>(() => {
    return getWorkspace(selectedWorkspaceID.value)!;
  });

  //获取工作空间
  const getWorkspace = (id: string) => {
    return workspace.value.find(item => item.id == id);
  };

  //选中工作空间
  const selectWorkspace = (id: string) => {
    selectedWorkspaceID.value = id;
  };

  //删除工作空间
  const removeWorkspace = (id: string) => {
    workspace.value = workspace.value.filter(item => item.id != id);

    selectWorkspace(workspace.value[0].id);
  };

  //添加工作空间
  const addWorkspace = (option: Omit<Workspace, "id">) => {
    const id = nanoid();

    workspace.value.push({
      id,
      ...option,
    });

    selectWorkspace(id);
  };

  //重命名工作空间
  const renameWorkspace = (id: string, name: string) => {
    const item = getWorkspace(id);

    if (item) {
      item.name = name;
    }
  };

  return {
    workspace,
    selectedWorkspaceID,
    selectedWorkspace,
    getWorkspace,
    selectWorkspace,
    removeWorkspace,
    addWorkspace,
    renameWorkspace,
  };
});
