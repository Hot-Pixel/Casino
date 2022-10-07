function depositAmount() {
  const btnsArr20 = document.querySelectorAll(".btnAmount__20");
  const btnsArr50 = document.querySelectorAll(".btnAmount__50");
  const btnsArr100 = document.querySelectorAll(".btnAmount__100");
  const inputAmount = document.querySelector(".depositDetail__amount");


  btnsArr20.forEach((btn20) => {
    btn20.addEventListener("click", () => {
        inputAmount.value = 20;
      });
  })
  btnsArr50.forEach((btn50) => {
    btn50.addEventListener("click", () => {
        inputAmount.value = 50;
      });
  })
  btnsArr100.forEach((btn100) => {
    btn100.addEventListener("click", () => {
        inputAmount.value = 100;
      });
  })

}

export default depositAmount;
