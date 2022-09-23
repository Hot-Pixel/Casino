import { g as gsapWithCSS } from './depositAmmount-f89dd174.js';

function depositCopy() {
  const iban = document.querySelector("#iban");
  const copyBtn = document.querySelector(".depositTransfer__table-copy");

  copyBtn.addEventListener("click", () => {
    gsapWithCSS
      .timeline()
      .to(copyBtn, { scale: 0.9, duration: 0.2 })
      .to(copyBtn, { scale: 1, duration: 0.2 });

    navigator.clipboard.writeText(iban.innerText);
  });
}

export { depositCopy as d };
//# sourceMappingURL=depositCopy-506d8229.js.map
