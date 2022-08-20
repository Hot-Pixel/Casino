import mixitup from 'mixitup';
import mixitupMultifilter from './mixitup-multifilter.js';
import { gsap } from "gsap";

mixitup.use(mixitupMultifilter);

const tags = document.querySelectorAll(".filterSlots__tag");
const hearts = document.querySelectorAll(".gridGames__item-favourite");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("fav");
    if (heart.classList.contains("fav")) {
      heart.parentElement.classList.add("favorito");
    } else {
      heart.parentElement.classList.remove("favorito");
    }
  });
});

tags.forEach((tag) => {
  tag.addEventListener("click", (e) => {
    if (e.currentTarget.classList.contains("mixitup-control-active")) {
      e.currentTarget.firstElementChild.setAttribute(
        "src",
        "img/icon-filter-noActive.svg"
      );
    } else {
      e.currentTarget.firstElementChild.setAttribute(
        "src",
        "img/icon-filter-active.svg"
      );
    }
  });
});

const mixerSlots = mixitup(".slotsFinder", {
  multifilter: {
    enable: true,
  },
  controls: {
    enable: true,
  },
  animation: {
    enable: false,
  },
  callbacks: {
    onMixClick: function() {
        // Reset the search if a filter is clicked

        if (this.matches('[data-filter]')) {
            inputSearch.value = '';
        }
    }
}
});

const accorArrows = document.getElementsByClassName("accorArrow");
const accorBody = document.getElementsByClassName("body");

for (let n = 0; n < accorArrows.length; n++) {
  accorArrows[n].addEventListener("click", () => {
    if (accorBody[n].classList.contains("active")) {
      gsap
        .timeline()
        .to(accorArrows[n], { rotation: -90, duration: 0.3 })
        .to(accorBody[n], { opacity: 0, duration: 0.3 })
        .to(accorBody[n], { height: 0, duration: 0.3 });
      accorBody[n].classList.remove("active");
    } else {
      gsap
        .timeline()
        .to(accorArrows[n], { rotation: 90, duration: 0.3 })
        .to(accorBody[n], { height: "auto", duration: 0.3 })
        .to(accorBody[n], { opacity: 1, duration: 0.3 });
      accorBody[n].classList.add("active");
    }
  });
}

// var inputSearch = document.querySelector('#nameSearch');
// var keyupTimeout;

// // Set up a handler to listen for "keyup" events from the search input

// inputSearch.addEventListener('keyup', function() {
//     var searchValue;

//     if (inputSearch.value.length < 3) {
//         // If the input value is less than 3 characters, don't send

//         searchValue = '';
//     } else {
//         searchValue = inputSearch.value.toLowerCase().trim();

//     }

//     // Very basic throttling to prevent mixer thrashing. Only search
//     // once 350ms has passed since the last keyup event

//     clearTimeout(keyupTimeout);

//     keyupTimeout = setTimeout(function() {
//         filterByString(searchValue);
//     }, 350);
// });

// /**
//  * Filters the mixer using a provided search string, which is matched against
//  * the contents of each target's "class" attribute. Any custom data-attribute(s)
//  * could also be used.
//  *
//  * @param  {string} searchValue
//  * @return {void}
//  */
// const item = document.querySelector('.gridGames__item');

// function filterByString(searchValue) {

//     if (searchValue) {
//         // Use an attribute wildcard selector to check for matches
//         console.log(searchValue)
//         mixerSlots.filter('[class*="' + searchValue + '"]');
//     } else {
//         // If no searchValue, treat as filter('all')

//         mixerSlots.filter('all');
//     }
// }