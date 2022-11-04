import disableScreen from "./modules/disableScreen.js";
import gameLauncher from "./modules/game-launcher.js";
import screensSizer from "./modules/screens-sizer";

screensSizer();
gameLauncher();

window.disableScreen = disableScreen;