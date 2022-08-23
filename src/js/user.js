import { gsap } from "gsap";

const userBtn = document.querySelector(".user");
const header = document.querySelector("header.header");
const userScreen = document.querySelector(".userScreen");
const userMenu = document.querySelector(".userMenu");

// userBtn.addEventListener("click", () => {
//   header.classList.toggle("header--light");
//   userScreen.classList.toggle("user-on");
//   if (userScreen.classList.contains("user-on")) {
//     gsap
//       .timeline()
//       .to(userScreen, { opacity: 1, duration: 0.4 })
//       .to(userMenu, { left: 0, opacity: 1, duration: 0.4 });
//   } else {
//     gsap
//       .timeline()
//       .to(userMenu, { left: "-15%", opacity: 0, duration: 0.4 })
//       .to(userScreen, { opacity: 0, duration: 0.4 });
//   }
// });
