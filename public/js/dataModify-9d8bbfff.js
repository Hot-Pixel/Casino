function dataModify() {
  const dataModifyOpen = document.querySelector(".data__modify-open");
  const dataModifyClose = document.querySelector(".data__modify-close");
  const dataBlock = document.querySelector(".dataBlock");
  const dataModifyBlock = document.querySelector(".dataModifyBlock");

  dataModifyOpen.addEventListener("click", () => {
    dataBlock.classList.remove("block-active");
    dataModifyBlock.classList.add("block-active");
  });

  dataModifyClose.addEventListener("click", () => {
    dataBlock.classList.add("block-active");
    dataModifyBlock.classList.remove("block-active");
  });
}

export { dataModify as d };
//# sourceMappingURL=dataModify-9d8bbfff.js.map
