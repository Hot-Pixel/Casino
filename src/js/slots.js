import carouselJackpot from "./modules/carouselJackpot.js";
import carouselGrid from "./modules/carouselGrid.js";
import popUpSaldo from "./modules/popUpBalance.js";
import collapseGrid from "./modules/collapseGridHalf.js";
import marginHeader from "./modules/marginHeader.js";
import depositSteps from "./modules/depositSteps.js";
import depositAmmount from "./modules/depositAmmount.js";
import depositCopy from "./modules/depositCopy.js";
import menuHeaderMobile from "./modules/menuHeaderMobile.js";

let carouselGridA, carouselGridB, carouselGridC;

let data =[
  {
    id: ".gridFullA .splide",
    name: carouselGridA
  },
  {
    id: ".gridFullB .splide",
    name: carouselGridB
  },
  {
    id: ".gridFullC .splide",
    name: carouselGridC
  },
]

window.addEventListener('load', () => {
  carouselJackpot()
  carouselGrid(data[0].id, data[0].name)
  carouselGrid(data[1].id, data[1].name)
  carouselGrid(data[2].id, data[2].name)
  popUpSaldo()
  collapseGrid()
  marginHeader()
  depositSteps();
  depositAmmount();
  depositCopy();
  menuHeaderMobile();
})
