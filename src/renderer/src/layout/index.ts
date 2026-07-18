import { SplitterPanel } from 'reka-ui';

export const panelRef = ref<InstanceType<typeof SplitterPanel>>();

export const toggleSilderbar = () => {
  if (!panelRef.value) {
    return;
  }

  panelRef.value.isCollapsed
    ? panelRef.value.expand()
    : panelRef.value.collapse();
};
