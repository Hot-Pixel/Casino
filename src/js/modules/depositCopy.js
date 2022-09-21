import { gsap } from "gsap";

function depositCopy() {
  const iban = document.querySelector("#iban");
  const copyBtn = document.querySelector(".depositTransfer__table-copy");

  copyBtn.addEventListener("click", () => {
    gsap
      .timeline()
      .to(copyBtn, { scale: 0.9, duration: 0.2 })
      .to(copyBtn, { scale: 1, duration: 0.2 });

    navigator.clipboard.writeText(iban.innerText);
  });
}

export default depositCopy;
