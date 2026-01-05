export default (cb: () => HTMLDivElement | undefined) => {
  let panning = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  //处理鼠标按下
  const handleMousedown = (e: MouseEvent) => {
    const containerRef = cb();

    if (!containerRef) {
      return;
    }

    panning = true;
    startX = e.clientX;
    startY = e.clientY;
    startLeft = containerRef.scrollLeft;
    startTop = containerRef.scrollTop;

    //添加鼠标样式
    document.body.classList.add("cursor-grabbing");

    //鼠标移动
    containerRef.addEventListener("mousemove", handleMousemove);

    //鼠标抬起结束
    window.addEventListener("mouseup", handleMouseup);
  };

  //处理鼠标松开
  const handleMouseup = () => {
    const containerRef = cb();

    if (!containerRef) {
      return;
    }

    panning = false;

    //移除鼠标样式
    document.body.classList.remove("cursor-grabbing");

    //移除鼠标移动
    containerRef.removeEventListener("mousemove", handleMousemove);

    //移除抬起
    window.removeEventListener("mouseup", handleMouseup);
  };

  //处理鼠标移动
  const handleMousemove = (e: MouseEvent) => {
    const containerRef = cb();

    if (!containerRef || !panning) {
      return;
    }

    containerRef.scrollLeft = startLeft - (e.clientX - startX);
    containerRef.scrollTop = startTop - (e.clientY - startY);
  };

  return { handleMousedown, handleMousemove };
};
