import { a as accordion } from './accordion-0c23f69a.js';
import { p as popUpSaldo, m as marginHeader, d as depositSteps, a as depositAmmount, b as depositCopy, c as menuHeaderMobile, u as userMenuMobile } from './userMenuMobile-87364a79.js';

function countdown() {

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
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
    }, 1000);

}

window.addEventListener("load", () => {
  accordion();
  popUpSaldo();
  marginHeader();
  depositSteps();
  depositAmmount();
  depositCopy();
  countdown();
  menuHeaderMobile();
  userMenuMobile();
});
//# sourceMappingURL=promocion.js.map
