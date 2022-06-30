// const menuMobile = document.querySelector(".o-menu__mobile");
// const carouselInvestigaciones = document.querySelector(
//   ".o-carousel__investigaciones"
// );
// const ficha = document.querySelector(".m-ficha");
// const nav = document.querySelector("#o-navbar");
// const info = document.querySelector(".m-info");

// window.addEventListener("load", () => {
//   if (jQuery(ficha).length > 0) {
//     gallery();
//   }
//   if (jQuery(menuMobile).length > 0) {
//     menuResponsive();
//     new AccMobile();
//   }
//   if (jQuery(carouselInvestigaciones).length > 0) {
//     investigacionesCarousel();
//     invMore();
//   }
//   if (jQuery(info).length > 0) {
//     tallerCarousel();
//     toggleInfo();
//     toggleColaboracion();
//     azulCarousel();
//     rubiCarousel();
//     tipelCarousel();
//     toggleLang();
//   }
//   if (jQuery(nav).length > 0) {
//     menuFicha();
//     new Acc();
//   }
// });

// //MENU MOBILE
// const openBtn = document.querySelector(".header__menu--open");
// const closeBtn = document.querySelector(".c-menu__close");

// function menuResponsive() {
//   openBtn.addEventListener("click", () => {
//     menuMobile.style.display = "block";
//     menuMobile.style.zIndex = "100";
//     setTimeout(() => {
//       menuMobile.classList.add("active");
//     }, 100);
//   });
//   closeBtn.addEventListener("click", () => {
//     menuMobile.classList.remove("active");
//     menuMobile.style.zIndex = "-1";
//     menuMobile.style.display = "none";
//   });
// }

// const spaBtn = document.querySelector('#spa');
// const engBtn = document.querySelector('#eng');
// const spaTxt = document.querySelector('.c-info__bio--text-spa')
// const engTxt = document.querySelector('.c-info__bio--text-eng')

// function toggleLang() {
//   spaBtn.addEventListener('click', () => {
//     spaTxt.className = 'c-info__bio--text-spa active';
//     engTxt.className = 'c-info__bio--text-eng hidden';
//   });
//   engBtn.addEventListener('click', () => {
//     spaTxt.className = 'c-info__bio--text-spa hidden';
//     engTxt.className = 'c-info__bio--text-eng active';
//   })
// }

// //Navegacion Lateral
// const toggleButton = document.querySelector(".c-navbar__arrow");
// const titulo = document.querySelector(".c-navbar__titulo");
// const menuOpened = document.querySelector(".c-navbar__max");
// const menuClosed = document.querySelector(".c-navbar__min");
// let flap = "";

// class MenuHome {
//   constructor() {
//     this._closeMenu();
//     this._openMenu();
//   }

//   _closeMenu() {
//     closeButton.addEventListener("click", () => {
//       gsap
//         .timeline()
//         .to(".c-navbar__home--wrapper", { opacity: 0, duration: 0.2 })
//         .to("#o-navbar__home", {
//           duration: 0.3,
//           ease: "slow (0.7, 0.7, false)",
//           width: "10vw",
//         })
//         .to("#o-navbar__home", {
//           className: "-=o-navbar__home--collapsed",
//           duration: 0.2,
//         })
//         .to(".c-navbar__home--min", { opacity: 1, duration: 0.2 });
//     });
//   }

//   _openMenu() {
//     openButton.addEventListener("click", () => {
//       gsap
//         .timeline()
//         .to(".c-navbar__home--min", { opacity: 0, duration: 0.2 })
//         .to("#o-navbar__home", {
//           duration: 0.3,
//           ease: "slow (0.7, 0.7, false)",
//           width: "20vw",
//         })
//         .to("#o-navbar__home", {
//           className: "+=o-navbar__home--expanded",
//           duration: 0.2,
//         })
//         .to(".c-navbar__home--wrapper", { opacity: 1, duration: 0.2 });
//     });
//   }
// }

// //Navegacion Lateral Ficha
// if (jQuery(".m-ficha").length > 0) {
//   flap = document.querySelector(".c-gallery__info");
// } else if (jQuery(".m-investigacion").length > 0) {
//   flap = document.querySelector(".c-description__info");
// } else {
//   flap = null;
// }

// function menuFicha() {
//   toggleButton.addEventListener("click", () => {
//     if (jQuery(".o-navbar__expanded").length > 0) {
//       gsap
//         .timeline()
//         .to(".c-navbar__max", { opacity: 0, duration: 0.3 })
//         .to("#o-navbar", {
//           duration: 0.5,
//           width: "10vw",
//           ease: Power4.easeOut,
//         })
//         .to(
//           flap,
//           {
//             duration: 0.5,
//             x: 0,
//             ease: Power4.easeOut,
//           },
//           "<"
//         )
//         .to("#o-navbar", {
//           className: "-=o-navbar__collapsed",
//           duration: 0,
//         })
//         .to(".c-navbar__arrow", { rotation: 0, duration: 0.5 })
//         .to(".c-navbar__min", { opacity: 1, duration: 0.5 }, "<");
//     } else if (jQuery(".o-navbar__collapsed").length > 0) {
//       gsap
//         .timeline()
//         .to(".c-navbar__min", { opacity: 0, duration: 0.3 })
//         .to("#o-navbar", {
//           duration: 0.5,
//           width: "20vw",
//           ease: Power4.easeOut,
//         })
//         .to(
//           flap,
//           {
//             duration: 0.5,
//             x: -500,
//             ease: Power4.easeOut,
//           },
//           "<"
//         )
//         .to("#o-navbar", {
//           className: "+=o-navbar__expanded",
//           duration: 0,
//         })
//         .to(".c-navbar__arrow", { rotate: 180, duration: 0.5 })
//         .to(".c-navbar__max", { opacity: 1, duration: 0.5 }, "<");
//     }
//   });
// }

// //Accordeon Menu Lateral
// const obraAcc = document.querySelector(".c-navbar__accO");
// const investAcc = document.querySelector(".c-navbar__accI");
// const obraHeader = document.querySelector(".c-navbar__nav-headerO");
// const investHeader = document.querySelector(".c-navbar__nav-headerI");

// class Acc {
//   constructor() {
//     this._obraAcc();
//     this._investigacionAcc();
//   }

//   _obraAcc() {
//     obraAcc.addEventListener("mouseenter", () => {
//       obraAcc.classList.toggle("active");
//     });
//     obraAcc.addEventListener("mouseleave", () => {
//       obraAcc.classList.toggle("active");
//     });
//   }
//   _investigacionAcc() {
//     investAcc.addEventListener("mouseenter", () => {
//       investAcc.classList.toggle("active");
//     });
//     investAcc.addEventListener("mouseleave", () => {
//       investAcc.classList.toggle("active");
//     });
//   }
// }

// const obraAccM = document.querySelector(".c-menu__accO");
// const investAccM = document.querySelector(".c-menu__accI");

// class AccMobile {
//   constructor() {
//     this._obraAccM();
//     this._investigacionAccM();
//   }

//   _obraAccM() {
//     obraAccM.addEventListener("click", () => {
//       obraAccM.classList.toggle("active");
//     });
//   }
//   _investigacionAccM() {
//     investAccM.addEventListener("click", () => {
//       investAccM.classList.toggle("active");
//     });
//   }
// }

// function investigacionesCarousel() {
//   var splide = new Splide(".o-carousel__investigaciones", {
//     arrows: true,
//     pagination: false,
//     perPage: 1,
//     drag: true,
//     height: 600,
//   });

//   splide.mount();
// }

// function tallerCarousel() {
//   var splide = new Splide(".c-info__taller", {
//     arrows: true,
//     pagination: false,
//     perPage: 1,
//     drag: true,
//     height: 600,
//   });

//   splide.mount();
// }

// function azulCarousel() {
//   var splide = new Splide(".c-info__colaboracion--carouselAzul", {
//     arrows: true,
//     pagination: false,
//     perPage: 2,
//     gap: 30,
//     padding: 100,
//     drag: true,
//   });

//   splide.mount();
// }
// function rubiCarousel() {
//   var splide = new Splide(".c-info__colaboracion--carouselRubi", {
//     arrows: true,
//     pagination: false,
//     perPage: 2,
//     gap: 30,
//     padding: 100,
//     drag: true,
//   });

//   splide.mount();
// }
// function tipelCarousel() {
//   var splide = new Splide(".c-info__colaboracion--carouselTipel", {
//     arrows: true,
//     pagination: false,
//     perPage: 2,
//     gap: 30,
//     padding: 100,
//     drag: true,
//   });

//   splide.mount();
// }

// function gallery() {
//   lightGallery(document.getElementById("gallery"), {
//     thumbnail: true,
//   });
// }

// const bioButton = document.querySelector("#bio");
// const tallerButton = document.querySelector("#taller");
// const colaboracionButton = document.querySelector("#colaboracion");
// const buttons = document.querySelectorAll(".c-info__menu--nav .c-info__nav li");
// const contents = document.querySelectorAll(".m-info .content");
// const contentBio = document.querySelector(".c-info__bio");
// const contentTaller = document.querySelector(".c-info__taller");
// const contentColaboracion = document.querySelector(".c-info__colaboracion");
// const navColaboracion = document.querySelector(".c-info__nav--col");

// function toggleInfo() {
//   bioButton.addEventListener("click", () => {
//     navColaboracion.classList.add("d-none");
//     buttons.forEach((button) => {
//       button.classList.remove("active");
//     });
//     contents.forEach((content) => {
//       content.classList.add("d-none");
//     });
//     bioButton.classList.add("active");
//     contentBio.classList.remove("d-none");
//   });

//   tallerButton.addEventListener("click", () => {
//     navColaboracion.classList.add("d-none");
//     buttons.forEach((button) => {
//       button.classList.remove("active");
//     });
//     contents.forEach((content) => {
//       content.classList.add("d-none");
//     });
//     tallerButton.classList.add("active");
//     contentTaller.classList.remove("d-none");
//   });

//   colaboracionButton.addEventListener("click", () => {
//     buttons.forEach((button) => {
//       button.classList.remove("active");
//     });
//     contents.forEach((content) => {
//       content.classList.add("d-none");
//     });
//     colaboracionButton.classList.add("active");
//     contentColaboracion.classList.remove("d-none");
//     navColaboracion.classList.remove("d-none");
//   });
// }

// const azulButton = document.querySelector("#azul");
// const rubiButton = document.querySelector("#rubi");
// const tipelButton = document.querySelector("#tipel");
// const azulContent = document.querySelector(".c-info__colaboracion--azul");
// const rubiContent = document.querySelector(".c-info__colaboracion--rubi");
// const tipelContent = document.querySelector(".c-info__colaboracion--tipel");
// const contentsCol = document.querySelectorAll(".content__col");
// const buttonsCol = document.querySelectorAll(".c-info__nav--col li");

// function toggleColaboracion() {
//   azulButton.addEventListener("click", () => {
//     buttonsCol.forEach((button) => {
//       button.classList.remove("active");
//     });
//     contentsCol.forEach((content) => {
//       content.classList.add("d-none");
//     });
//     azulButton.classList.add("active");
//     azulContent.classList.remove("d-none");
//   });

//   rubiButton.addEventListener("click", () => {
//     buttonsCol.forEach((button) => {
//       button.classList.remove("active");
//     });
//     contentsCol.forEach((content) => {
//       content.classList.add("d-none");
//     });
//     rubiButton.classList.add("active");
//     rubiContent.classList.remove("d-none");
//   });

//   tipelButton.addEventListener("click", () => {
//     buttonsCol.forEach((button) => {
//       button.classList.remove("active");
//     });
//     contentsCol.forEach((content) => {
//       content.classList.add("d-none");
//     });
//     tipelButton.classList.add("active");
//     tipelContent.classList.remove("d-none");
//   });
// }

// function invMore() {
//   const moreBtn = document.querySelector(".o-carousel__more");
//   const moreClose = document.querySelector(".c-description__closeBtn");
//   const descMobile = document.querySelector(".c-description__info-mobile");
//   const carouselInv = document.querySelector(".o-carousel__investigaciones");
//   const headerMobile = document.querySelector(".o-header__mobile");
//   moreBtn.addEventListener("click", () => {
//     descMobile.style.display = "block";
//     carouselInv.style.display = "none";
//     setTimeout(() => {
//       headerMobile.classList.add("colorChange");
//       descMobile.classList.add("active");
//     }, 100);
//   });
//   moreClose.addEventListener("click", () => {
//     headerMobile.classList.remove("colorChange");
//     descMobile.classList.remove("active");
//     descMobile.style.display = "none";
//     carouselInv.style.display = "flex";
//   });
// }

