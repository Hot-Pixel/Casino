import DemoBar from "./modules/demo-bar.js";
import disableScreen from "./modules/disableScreen.js";
import gameLauncher from "./modules/game-launcher.js";
import screensSizer from "./modules/screens-sizer";

screensSizer();
gameLauncher();
new DemoBar();

window.disableScreen = disableScreen;