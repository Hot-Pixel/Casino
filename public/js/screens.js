(function () {
  'use strict';

  function heartToggle() {
    const heartBtn = document.querySelector(".heart");

    heartBtn.addEventListener("click", () => {
      heartBtn.classList.toggle("active");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    heartToggle();
  });

})();
