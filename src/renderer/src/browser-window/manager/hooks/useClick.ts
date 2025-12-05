type Option = {
  click: () => void;
  dblclick: () => void;
};

export default ({ click, dblclick }: Option) => {
  let clickTimer: number | null = null;

  const delay = 200;

  const onSingleClick = ({ detail }: MouseEvent) => {
    if (detail === 1) {
      clickTimer = window.setTimeout(() => {
        click();
      }, delay);
    }
  };

  const onDoubleClick = () => {
    clearTimeout(clickTimer as number);
    dblclick();
  };

  return {
    onSingleClick,
    onDoubleClick,
  };
};
