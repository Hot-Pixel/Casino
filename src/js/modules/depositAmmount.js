function depositAmmount() {
  const btnsArr20 = document.querySelectorAll(".btnAmmount__20");
  const btnsArr50 = document.querySelectorAll(".btnAmmount__50");
  const btnsArr100 = document.querySelectorAll(".btnAmmount__100");
  const inputAmmount = document.querySelector(".depositDetail__ammount");


  btnsArr20.forEach((btn20) => {
    btn20.addEventListener("click", () => {
        inputAmmount.value = 20;
      });
  })
  btnsArr50.forEach((btn50) => {
    btn50.addEventListener("click", () => {
        inputAmmount.value = 50;
      });
  })
  btnsArr100.forEach((btn100) => {
    btn100.addEventListener("click", () => {
        inputAmmount.value = 100;
      });
  })

}

export default depositAmmount;
