import { gsap } from "gsap";

const accorArrows = document.getElementsByClassName("accorArrow");
const accorBody = document.getElementsByClassName("body");

console.log(accorBody);

for (let n = 0; n < accorArrows.length; n++) {
  accorArrows[n].addEventListener("click", () => {
    if (accorBody[n].classList.contains("active")) {
      gsap
        .timeline()
        .to(accorArrows[n], { rotation: -90, duration: 0.3 })
        .to(accorBody[n], { opacity: 0, duration: 0.3 })
        .to(accorBody[n], { height: 0, padding:0, duration: 0.3 });
      accorBody[n].classList.remove("active");
    } else {
      gsap
        .timeline()
        .to(accorArrows[n], { rotation: 0, duration: 0.3 })
        .to(accorBody[n], { height: "auto", padding: 15, duration: 0.3 })
        .to(accorBody[n], { opacity: 1, duration: 0.3 });
      accorBody[n].classList.add("active");
    }
  });
}

//CUENTA ATRAS
// Set the date we're counting down to
const date = new Date();
let countDownDate = date.setDate(date.getDate() + 30);

// Update the count down every 1 second
let x = setInterval(function() {

  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  let daysInput = document.getElementById("days").innerText = days;
  let hoursInput = document.getElementById("hours").innerHTML = hours;
  let minutesInput = document.getElementById("minutes").innerHTML = minutes;
  let secondsInput = document.getElementById("seconds").innerHTML = seconds;

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);

const popUpCloseBtn = document.querySelector('.popUpBalance__closeBtn');
const popUpOpenBtn = document.querySelector('.popUpBalance__openBtn');
const popUpMenu = document.querySelector('.popUpBalance');

popUpOpenBtn.addEventListener('click', () => {
  popUpMenu.style.display = 'block';
})

popUpCloseBtn.addEventListener('click', () => {
  popUpMenu.style.display = 'none';
})

const menuHeaderOpenBtn = document.querySelector(".menuHeader__openBtn");
const menuHeaderCloseBtn = document.querySelector(".menuHeader__closeBtn");
const menuHeader = document.querySelector(".menuHeader");

menuHeaderOpenBtn.addEventListener("click", () => {
  menuHeader.style.display = "flex";
});
menuHeaderCloseBtn.addEventListener("click", () => {
  menuHeader.style.display = "none";
});